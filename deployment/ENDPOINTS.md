# Deployment & Service Endpoints

The following table lists the required service endpoints for the Shotweave application.

| Service Name | Protocol | Host (IP or domain) | Port | Path / Example URL |
| :--- | :--- | :--- | :--- | :--- |
| **Web Frontend (Vite)** | http | 202.88.252.51 | 5173 | / $\rightarrow$ http://202.88.252.51:5173/ |
| **API Server (Flask)** | http | 202.88.252.51 | 5000 | /api/login $\rightarrow$ http://202.88.252.51:5000/api/login |
| **Database (MongoDB)** | tcp | 202.88.252.51 | 27017 | N/A |

## Notes

* **Host IP:** The same host IP is used for all services as they are running concurrently on the same machine.
* **Database:** MongoDB is running locally on the standard port 27017.