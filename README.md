# COMP333HW4
 Wesleyan University COMP333 HW4

IP Address Setup: open the comp333hw4 directory. Navigate to HW4>APIContext.js and set the IP defined in the line:
const [ipAddress, setIpAddress] = useState('172.21.51.242');
to be your computers IP.
You can find your IP on mac by entering 'ifconfig' (not ipconfig) into the terminal. It should be displayed as something like: inet 172.21.51.242
*note: the first inet address displayed may be something like 127.0.0.1. This is your computer's default address, and will not work. Use the one a few lines below.

To run: put the contents of the backendbasics folder into htdocs and start servers using XAMPP. Open android studio and start a Pixel 5 API 34 emulator (graders will test using API 31, but I can't seem to access that with Android Studio). Open a terminal tab in the HW4 folder and run "npm start." Then type 'a' to run the app in the emulator. You can also scan the qr code to open the app with the expo go app on iPhone.

To set up SQL database: 
"
CREATE DATABASE music_db;

USE music_db;

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    artist VARCHAR(255),
    song VARCHAR(255),
    rating INT,
    FOREIGN KEY(username) REFERENCES users(username)
);
"

