import React from 'react';

const APIDOCS = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">API Documentation</h1>
        <p className="mb-4">
          Welcome to the PeerTask API documentation. Here you will find all the information you need to integrate with our platform.
        </p>
        <h2 className="text-xl font-semibold mb-2">Authentication</h2>
        <p className="mb-4">
          Our API uses token-based authentication. You will need to include your access token in the Authorization header of each request.
        </p>
        <h2 className="text-xl font-semibold mb-2">Endpoints</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>GET /tasks</strong>: Retrieve a list of tasks.</li>
          <li><strong>POST /tasks</strong>: Create a new task.</li>
          <li><strong>PUT /tasks/:id</strong>: Update an existing task.</li>
          <li><strong>DELETE /tasks/:id</strong>: Delete a task.</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Rate Limiting</h2>
        <p className="mb-4">
          To ensure fair usage, our API is rate-limited to 100 requests per minute. Exceeding this limit will result in a 429 Too Many Requests response.
        </p>
        <h2 className="text-xl font-semibold mb-2">Support</h2>
        <p>
          If you have any questions or need assistance, please contact our support team at api-support@peertask.com.
        </p>
      </div>
    </div>
  );
};

export default APIDOCS;
