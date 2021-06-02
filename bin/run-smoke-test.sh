# Setup required environment variables. TEST_URL should be set by CNP
export E2E_FRONTEND_URL=https://fees-register-frontend-pr-306.service.core-compute-preview.internal

yarn test:smoketest
