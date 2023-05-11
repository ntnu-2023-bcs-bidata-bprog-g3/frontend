# OLM Frontend
Demo tool for interacting with Offline License Management system.  

All requests to LFAs are first sent to the NMS and then relayed to the correct LFA in order to support the system topology.


**Note** This codebase is out of scope for the bachelor thesis, meaning less time has been spent on QA.

## Project setup
Installs all dependecies:
```
npm install
```

Compiles and hot-reloads for development:
```
npm run serve
```

Compiles and minifies for production:
```
npm run build
```

The code should automatically detect an online **NMS** on the same device / network. If not, ensure that the **NMS** is running on port 8090.
