/**
 * ICP Backend Integration Test Page
 * Test page to verify backend connectivity
 */

import ICPBackendDemo from '@/components/examples/ICPBackendDemo';

export default function ICPTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <ICPBackendDemo />
      </div>
    </div>
  );
}
