// src/components/Profile.jsx
export default function Profile() {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome back, Truth Ninja!</h1>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">YokA...03DC</h2>
              <p className="text-gray-600">Reputation level 2</p>
              <p className="text-2xl font-bold mt-2">780 $TRUTH</p>
              <p className="text-gray-600 mt-2">Verified claims 15</p>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Run Quick check
              </button>
              <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                Submit new report
              </button>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">My Activity</h3>
              <div className="space-y-2">
                <p>Quick checks <span className="float-right">14 this month</span></p>
                <p>Reports filed <span className="float-right">6 total</span></p>
                <p>Vote casts <span className="float-right">24 DAO votes</span></p>
                <p>Tokens earned <span className="float-right">780 $TRUTH</span></p>
              </div>
            </div>
  
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  You verified a claim<br />
                  <span className="font-semibold">"Naira redesigned again"</span><br />
                  Earned 20 $TRUTH
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }