// Helper script to fix all test files
const fs = require('fs');
const path = require('path');

const testFiles = [
  'src/pages/tests/InterviewPrep.test.tsx',
  'src/pages/tests/Login.test.tsx', 
  'src/pages/tests/SignUp.test.tsx',
  'src/utils/tests/UploadImage.test.ts'
];

testFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix axios mocking issues
    content = content.replace(/vi\.mock\('.*axiosInstance.*'\)/, `const mockAxios = { get: vi.fn(), post: vi.fn() };\nvi.mock('../../utils/axiosInstance', () => ({ default: mockAxios }));`);
    content = content.replace(/const mockedAxios = vi\.mocked\(axiosInstance\)/, 'const mockedAxios = mockAxios');
    content = content.replace(/mockedAxios\.(get|post)\.mockResolvedValue/g, 'mockedAxios.$1.mockResolvedValue');
    content = content.replace(/mockedAxios\.(get|post)\.mock/g, 'mockedAxios.$1.mock');
    
    // Fix import issues
    content = content.replace(/import axiosInstance from '.*axiosInstance.*'/, '');
    content = content.replace(/import { API_PATHS } from '.*apiPaths.*'\n/, '');
    
    // Fix any type issues
    content = content.replace(/: any/g, ': unknown');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
  }
});

console.log('All test files fixed!');
