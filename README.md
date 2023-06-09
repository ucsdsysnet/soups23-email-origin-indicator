# Understanding the Viability of Gmail’s Origin Indicator for Identifying the Sender
In this repository, we open-source various code and data associated our SOUPS '23 paper: **Understanding the Viability of Gmail’s Origin Indicator for Identifying the Sender**.

Specifically, in this repository, you can find:
* The code for our mock Gmail web UI
* Full demographics data 
* Qualtrics survey questions for Control, Random, and Support groups.

## Read Our Paper
You can find our paper [here]().

#### Cite our paper
```
@inproceedings{liu23via,
    author = {Liu, Enze and Sun, Lu and Bellon, Alex and Ho, Grant and Voelker, Geoffrey M. and Savage, Stefan and Munyaka, Imani N. S.},
    title = {{Understanding the Viability of Gmail's Origin Indicator for Identifying the Sender}},
    booktitle = {Proceedings of the Nineteenth Symposium on Usable Privacy and Security},
    year = {2023},
}
```

## Deploying the Mock Gmail Web UI
This app is developed with React JS.

#### Configure Your Firebase Credentials
```bash
cd gmail-web-client/src/lib
vim firebase.js
# Then add your firebase credentials.
```

#### Deploy Locally
```bash
# Clone repo
git clone https://github.com/alexliu0809/gmail-ui-redesign.git

# Update npm if your npm version is too low (i.e. < 8)
# npm install -g npm@8

# Install dependencies
cd gmail-redesign-code
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
cd gmail-redesign-code

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