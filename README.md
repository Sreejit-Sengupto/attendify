
![Logo](https://res.cloudinary.com/dagn8yyfi/image/upload/v1729787673/attendifyapplogo_pwluig.png)


# Attendify

Attendify is a Attendance system that uses WebAuthentication for marking and verifying attendance of the students at no extra infrastructure cost. Administrators and students can register there hardware/devices like mobile phones or physical passkeys, the users can then use their device's hardware like fingerprint scanner(or even pattern/pin/password) to mark the attendance.

[Learn more about WebAuthentication](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)


## Acknowledgements

 - [Appwrite](https://appwrite.io)
 - [SimpleWebAuthn](https://simplewebauthn.dev/)
 - [readme.so](https://readme.so)


## Features

- **WebAuthentication** - Leverage built-in hardware like fingerprint sensors for secure and easy attendance marking and admin login.
- **Multi-User Support** - Distinct interfaces and functionalities for administrators and students.
- **Enhanced Security** - Ensure data integrity and prevent attendance fraud with biometric verification.
- **Real-Time Tracking** - Instantly record and update attendance information as students check in.


## Installation

Install the project with npm

- Fork/Clone the repository.
- Install all the dependencies.
```bash
  cd attendify
  npm install
```
- You will also require the server, get it from [here](https://github.com/Sreejit-Sengupto/attendify-server).
- Create an Appwrite account and create a database with two collections namely, 'organisations' and 'students' with the following attributes:
 
 #### organisations
| key | Type     | Default value                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | null |
| `email` | `email` | null |
| `phoneNumber` | `string` | null |
| `addressLine1` | `string` | null |
| `addressLine2 (not required)` | `string` | null |
| `state` | `string` | null |
| `city` | `string` | null |
| `students (not required)` | `Many to Many relationship with students` | null |
| `challenge (not required)` | `string` | null |
| `passkey (not required)` | `string` | null |
| `classes (not required)` | `Integer` | 0 |

 #### students
| key | Type     | Default value                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | null |
| `lastName` | `string` | null |
| `email` | `email` | null |
| `phoneNumber` | `string` | null |
| `organisations (not required)` | `Many to Many relationship with organisations` | null |
| `rollNumber (not required)` | `string` | null |
| `challenge (not required)` | `string` | null |
| `passkey (not required)` | `string` | null |
| `attendance (not required)` | `string` | {} |

- Paste the env variables in a .env file.
- Run `npm run dev` to start the application.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_APPWRITE_PROJECT_ID`

`VITE_APPWRITE_DB_ID`

`VITE_APPWRITE_STD_COLLECTION_ID`

`VITE_APPWRITE_ORG_COLLECTION_ID`
## Contributing

Contributions are always welcome!

| Note: If you are looking for the backend code you can get it [here](https://github.com/Sreejit-Sengupto/attendify-server)

We are open to all sorts of contributions, be it a bug or a feature. Please feel free to raise an issue and help us improve.

For any help or query you can reach out to me on [Discord](https://discord.gg/39bY6vwg).


## API Reference

Base URL: [https://attendify-server-7g6h.onrender.com](https://attendify-server-7g6h.onrender.com)

#### Generate passkey registration challenge

```http
  POST /api/v1/passkey/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. User ID from Appwrite Database |
| `category` | `string` | **Required**. "ORG" OR "STD" |

#### Verify passkey registration challenge

```http
  POST /api/v1/passkey/verify
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. User ID from Appwrite Database |
| `credential`      | `Object` | **Required**. options object returned by register challenge API |
| `category` | `string` | **Required**. "ORG" OR "STD" |

#### Generate login challenge

```http
  POST /api/v1/passkey/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `string` | **Required**. User ID from Appwrite Database |
| `category` | `string` | **Required**. "ORG" OR "STD" |

#### Verify login challenge

```http
  POST /api/v1/passkey/verify-login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. User ID from Appwrite Database |
| `credential`      | `Object` | **Required**. options object returned by register challenge API |
| `category` | `string` | **Required**. "ORG" OR "STD" |

#### Add label to user (Appwrite)

```http
  POST /api/v1/user/label
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. User ID from Appwrite accounts |
| `label` | `string` | **Required**. "ORG" OR "STD" |


## Screenshots

![Org Dashboard](https://github.com/user-attachments/assets/b1449ec3-9050-4152-bbd8-b46856b4f386)

![Student Dashboard](https://github.com/user-attachments/assets/490544d0-8a2b-47c3-bf41-e329fe76667c)

## Tech Stack

**Client:** React, TailwindCSS, MaterialUI, Lucide React, Appwrite, SimpleWebAuthn

**Server:** Node, Express, Appwrite, SimpleWebAuthn


## Authors

- [@sahil](https://github.com/capsule11)
- [@atulya](https://github.com/atulya-srivastava)
- [@sreejit](https://github.com/Sreejit-Sengupto)


## Appendix

WebAuthentication has been implemented using simplewebauthn, if you want to learn more about it you can refer to their docs [here](https://simplewebauthn.dev/docs/).


## Feedback

If you have any feedback, please reach out to us at sreesen2003@gmail.com

