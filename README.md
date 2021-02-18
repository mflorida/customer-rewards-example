# Rewards Points Tabulator

### About

This demo app will display a generated dataset of customers and random purchase data, calculate their accrued 
rewards points based on dollars spent per transaction, per month, and overall total, and display the 
resulting data in a table.

A demo can be viewed here: [https://mflorida.github.io/demos/customer-rewards/](https://mflorida.github.io/demos/customer-rewards/)

> Note: to run this demo, you need to upload the included `demo` folder to a web server, or run the Node.js 
> development server on your local machine and optionally build your own deployable web app. You will need 
> to make sure `yarn` and `node` are installed on your local machine (`yarn` should install `node` if necessary),
> but if you're reading this, you probably knew all of that.  ;-)

### Run locally

To run the app under Node.js using the supplied generated data (in the `/public/data` folder), simply
run `yarn install` to make sure necessary dependencies are installed, then `npm start` from the project's root folder.

### Generate new customer data

To generate a new customer dataset, either manually execute `/utils/createRewardsData.js`, or execute `run.sh` from the
project root, which will generate new data and start the demo server on your local machine at `http://localhost:3000`.

### Build and deploy

To build a new deployable application, run `yarn build` or to build then copy to the `demo` folder for uploading
to the repo, run the `build-demo.sh` script.
