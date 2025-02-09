const isBackendDeployed = true;

export const BACKEND_URL = isBackendDeployed 
  ? "https://shoplink-backend.isonikrish.workers.dev" 
  : "http://localhost:8787";