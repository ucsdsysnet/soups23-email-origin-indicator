# Understanding the Viability of Gmail’s Origin Indicator for Identifying the Sender
In this repository, we open-source various code and data associated our SOUPS '23 paper: **Understanding the Viability of Gmail’s Origin Indicator for Identifying the Sender**.

Specifically, in this repository, you can find:
* The code for our mock Gmail web UI
* Full demographics data 
* Qualtrics survey questions for Control, Random, and Support groups.

## Read Our Paper
You can find our paper [here](https://www.usenix.org/system/files/soups2023-liu.pdf).

#### Cite our paper
```
@inproceedings {liu23via,
	author = {Enze Liu and Lu Sun and Alex Bellon and Grant Ho and Geoffrey M. Voelker and Stefan Savage and Imani N. S. Munyaka},
	title = {Understanding the Viability of Gmail's Origin Indicator for Identifying the Sender},
	booktitle = {Nineteenth Symposium on Usable Privacy and Security (SOUPS 2023)},
	year = {2023},
	pages = {77--96},
	month = aug,
}

```

## Deploying the Mock Gmail Web UI
This app is developed with React JS.

#### Configure Your Firebase Credentials
```bash
# Clone repo
git clone https://github.com/ucsdsysnet/soups23-email-origin-indicator.git

# Update your firebase credentials.
cd gmail-web-client/src/lib
vim firebase.js
# Then add your firebase credentials.
```

#### Deploy Locally
```bash

# Update npm if your npm version is too low (i.e. < 8)
# npm install -g npm@8

# Install dependencies
cd gmail-web-client
rm -rf node_modules # remove old installation
rm package-lock.json yarn.lock # remove old locks
npm cache clear --force
npm install
yarn add uuid
yarn add react-router-dom
yarn add firebase
yarn add react-tooltip
# Start locally
yarn start
```

#### Deploy on Firebase
```bash
cd gmail-web-client

# Install dependencies
npm install -g firebase-tools

# Deploy with firebase
firebase login
firebase init
npm run build
firebase deploy ## https://clone-e0ec2.web.app/
```

#### Deploy the Latest
```
npm run build
firebase deploy
```


## Contact
If you have any questions, feel free to reach out to Alex Liu @ e7liu@eng.ucsd.edu.