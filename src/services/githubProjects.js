const GITHUB_USERNAME = 'John-Remoun';
const CONFIG_FILE_NAME = 'portfolio.json';
const CACHE_KEY = 'john_portfolio_projects_v2';
const CACHE_TIME_KEY = 'john_portfolio_projects_time_v2';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours (weekly/daily auto sync)

/**
 * Default fallback projects if network fails or API rate limit is exceeded
 */
export const FALLBACK_PROJECTS = [
  {
    id: 'ps-lounge-manager',
    repoName: 'Playstaion',
    title: 'PS Lounge Manager',
    subtitle: 'Offline Desktop Management System for PlayStation Lounges',
    desc: 'A production-ready offline desktop management system built for PlayStation gaming lounges. It manages live gaming sessions, sales, inventory, financial reporting, team access, working hours, monthly reporting, PDF exports, and native invoice printing — all without requiring internet access or external cloud services.',
    category: 'Desktop Applications',
    metric: 'Offline-First · 30-Day Analytics · 3-Level RBAC',
    stack: [
      'Electron',
      'React',
      'Node.js',
      'Express.js',
      'SQLite',
      'Better-SQLite3',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Nodemailer',
      'react-i18next'
    ],
    github: 'https://github.com/John-Remoun/Playstaion',
    demo: '',
    photos: [
      'https://raw.githubusercontent.com/John-Remoun/Playstaion/main/portfolio-photos/cover.png',
      'https://raw.githubusercontent.com/John-Remoun/Playstaion/main/portfolio-photos/photo1.png',
      'https://raw.githubusercontent.com/John-Remoun/Playstaion/main/portfolio-photos/photo2.png',
      'https://raw.githubusercontent.com/John-Remoun/Playstaion/main/portfolio-photos/photo3.png'
    ],
    order: 1,
    featured: true
  }
];

/**
 * Transforms GitHub Web/Blob URLs or relative image paths into raw viewable image URLs
 */
export function formatGithubImageUrl(url, repoName = '', defaultBranch = 'main') {
  if (!url) return '';

  // Handle standard github blob URLs (e.g. github.com/.../blob/main/portfolio-photos/cover.png)
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
  }

  // Handle relative paths like "portfolio-photos/cover.png" or "/portfolio-photos/cover.png"
  if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('data:')) {
    const cleanPath = url.replace(/^\//, '');
    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${cleanPath}`;
  }

  return url;
}

/**
 * Fetches user repositories from GitHub and checks each for portfolio.json
 */
export async function fetchGithubProjects(forceRefresh = false) {
  // Check local storage cache unless forceRefresh is requested
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && cachedTime) {
        const age = Date.now() - parseInt(cachedTime, 10);
        if (age < CACHE_TTL_MS) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return { projects: parsed, fromCache: true, lastUpdated: parseInt(cachedTime, 10) };
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage cache read error:', e);
    }
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);

    const repos = await res.json();

    const projectPromises = repos.map(async (repo) => {
      const branch = repo.default_branch || 'main';
      const rawJsonUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/${branch}/${CONFIG_FILE_NAME}`;

      try {
        const fileRes = await fetch(rawJsonUrl);
        if (fileRes.ok) {
          const data = await fileRes.json();
          if (data && data.showInPortfolio) {
            const rawPhotos = Array.isArray(data.photos) && data.photos.length > 0
              ? data.photos
              : (data.photo ? [data.photo] : []);

            const formattedPhotos = rawPhotos
              .map(photoUrl => formatGithubImageUrl(photoUrl, repo.name, branch))
              .filter(Boolean);

            return {
              id: repo.id || repo.name,
              repoName: repo.name,
              title: data.title || repo.name,
              subtitle: data.subtitle || repo.description || '',
              desc: data.description || repo.description || '',
              category: data.category || 'Applications',
              metric: data.metric || data.subtitle || repo.language || 'Featured Project',
              stack: Array.isArray(data.stack) ? data.stack : (repo.language ? [repo.language] : []),
              github: repo.html_url,
              demo: data.demoUrl || repo.homepage || '',
              photos: formattedPhotos.length > 0 ? formattedPhotos : ['/placeholder.jpg'],
              order: typeof data.order === 'number' ? data.order : 99,
              featured: Boolean(data.featured)
            };
          }
        }
      } catch (err) {
        // repo doesn't have portfolio.json or parse error
        return null;
      }
      return null;
    });

    const fetchedProjects = await Promise.all(projectPromises);

    const validProjects = fetchedProjects
      .filter(Boolean)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

    // Fallback if no repos contain portfolio.json yet
    const finalProjects = validProjects.length > 0 ? validProjects : FALLBACK_PROJECTS;
    const now = Date.now();

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(finalProjects));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    return { projects: finalProjects, fromCache: false, lastUpdated: now };
  } catch (err) {
    console.error('Error fetching dynamic projects from GitHub:', err);
    return { projects: FALLBACK_PROJECTS, fromCache: true, error: err.message, lastUpdated: Date.now() };
  }
}
