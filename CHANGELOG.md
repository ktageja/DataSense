# Changelog

All notable changes to this project will be documented in this file.


## Sprint-1

### Team changes

- New team members onboarded and familiarized with project documentation.

### Added
- Node.js Express server setup with `GET /sensor-data` and `POST /sensor-data` routes for processing sensor data.
- WebSocket setup: allows the server and the frontend to establish WebSocket connection (helps the server to share the newly received sensor data with the frontend in real time).
- In-memory storage (in the form of the .csv file) to store the sensor data.
