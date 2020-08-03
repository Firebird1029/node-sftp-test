// https://ourcodeworld.com/articles/read/133/how-to-create-a-sftp-client-with-node-js-ssh2-in-electron-framework
// https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
// https://stackoverflow.com/questions/5315138/node-js-remove-file
// https://www.sftp.net/public-online-sftp-servers

const fs = require("fs");

const Client = require("ssh2").Client;
const connSettings = {
	host: "test.rebex.net",
	port: 22, // Normal is 22 port
	username: "demo",
	password: "password",
	// You can use a key file too, read the ssh2 documentation
};

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
	path: "data.csv",
	header: [
		{ id: "name", title: "Name" },
		{ id: "surname", title: "Surname" },
		{ id: "age", title: "Age" },
		{ id: "gender", title: "Gender" },
	],
});

const data = [
	{
		name: "John",
		surname: "Snow",
		age: 26,
		gender: "M",
	},
	{
		name: "Clair",
		surname: "White",
		age: 33,
		gender: "F",
	},
	{
		name: "Fancy",
		surname: "Brown",
		age: 78,
		gender: "F",
	},
];

function finishedTransfer() {
	fs.unlinkSync("data.csv");
}

csvWriter.writeRecords(data).then(() => {
	console.log("The CSV file was written successfully");
	const conn = new Client();
	conn.on("ready", function () {
		conn.sftp(function (err, sftp) {
			/*if (err) throw err;

			const readStream = fs.createReadStream("data.csv");
			const writeStream = sftp.createWriteStream("data.csv");

			writeStream.on("close", function () {
				console.log("file transferred succesfully");
			});

			writeStream.on("end", function () {
				console.log("sftp connection closed");
				conn.close();
				finishedTransfer();
			});

			// initiate transfer of file
			readStream.pipe(writeStream);*/
			finishedTransfer();
		});
	}).connect(connSettings);
});
