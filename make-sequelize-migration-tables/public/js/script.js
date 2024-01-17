let addRowBtn = document.querySelector("#add-row-button")
let btn = document.querySelector("#submit-button")
let columnName = document.querySelector("#column-name")
let dataType = document.querySelector("#data-type")
let allowNull = document.querySelector("#allow-null")
let downloadScriptBtn = document.querySelector("#download-script")
let num = 0
let sequelize_migration_script = ""

const data_types = [
	"INTEGER",
	"BIGINT",
	"STRING",
	"STRING(100)",
	"STRING.BINARY",
	"STRING(100).BINARY",
	"TEXT",
	'TEXT("tiny")',
	'TEXT("medium")',
	'TEXT("long")',
	"CHAR",
	"CHAR(100)",
	"OTHER",
]

// hide the downlaod button unti script is ready
hideDownloadButton()
function hideDownloadButton() {
	downloadScriptBtn.style.display = "none"
}
// show the downlaod button unti script is ready
function showDownloadButton() {
	downloadScriptBtn.style.display = "inline-block"
}

// make new row using plus button
addRowBtn.addEventListener("click", function (e) {
	e.preventDefault()
	addNewRow()
	update_delete_button()
	datatype_dropdown_change_handler()
})

// Keyboard shortcut for making new row
document.addEventListener("keydown", function (e) {
	console.log(e.key)
	if (e.shiftKey && e.key === "Enter") {
		addNewRow()
		update_delete_button()
		datatype_dropdown_change_handler()
	}
})

function update_delete_button() {
	document.querySelectorAll(".delete-row-btn").forEach((btn) => {
		btn.addEventListener("click", function (e) {
			e.target.parentElement.parentElement.remove()
		})
	})
}

function addNewRow() {
	num++
	document.querySelector(".tbody").insertAdjacentHTML(
		"beforeend",
		`
		<tr>
			<td><input type="text" name='row-${num}' /></td>
			<td>
				${makeDatatypeDropdownOptions()}
			</td>
			<td><input type="checkbox" name="row-${num}" checked='true'/></td>
			<td><button class='delete-row-btn' type='button'>Delete</button></td>
		</tr>
	`,
	)
}

function makeDatatypeDropdownOptions() {
	let data_types_options = data_types.map((type) => {
		return `<option value=${type}>${type}</option>`
	})
	let data_types_dropdown_html = `<select class="dropdown" name="row-${num}"> ${data_types_options} </select>`
	data_types_dropdown_html += `<input type='text' class="d-none" placeholder="Enter Datatype" name="row-${num}"/>`
	return data_types_dropdown_html
}

function datatype_dropdown_change_handler() {
	let data_type_dropdown = document.querySelectorAll('.dropdown')

	data_type_dropdown.forEach((el) => {
		el.addEventListener('change',function(){
			console.log(el.value)
			let current_value = el.value.toLowerCase()
			if (current_value === 'other') {
				console.log(el.nextElementSibling,'--')
				el.nextElementSibling.classList.remove('d-none')
			} else {
				el.nextElementSibling.classList.add('d-none')
			}
		})
	})
}
btn.addEventListener("click", function (e) {
	e.preventDefault()
	let tableName = document.getElementById("table-name").value
	let obj = {}
	let form = new FormData(document.getElementById("my-form"))
	for (let [key, value] of form) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]]
			}
			obj[key].push(value)
		} else {
			obj[key] = value
		}
	}
	sequelize_migration_script += returnCommonSequelizeScript(tableName, obj)

	getSequelizeScript(tableName, sequelize_migration_script, (fileName) => {
		downloadSequelizeScript(fileName)
		sequelize_migration_script = ""
	})
})

function returnCommonSequelizeScript(tableName, obj) {
	return `
			const Sequelize = require('sequelize')	
			const sequelize = require('../config/db-connect-migration.js')

			const ${tableName} = sequelize.define('${tableName}', {
				id:{ 
					type:Sequelize.INTEGER, 
					allowNull: false, 
					primaryKey: true, 
					autoIncrement: true
				},
				${makeTableColumns(obj)}	
			})
			module.exports = ${tableName}
		`
}

function makeTableColumns(obj) {
	let columns = ""
	for (let i of Object.values(obj)) {
		columns += makeColumns(i[0], i[1], i[2])
	}
	return columns
}

function makeColumns(columnName, dataType, allowNull) {
	return `
			${columnName} : {
				type: Sequelize.${dataType.toUpperCase()}, 
				allowNull: ${allowNull ? true : false}
			},
			`
}

function getSequelizeScript(fileName, script, cb) {
	let sendData = {
		fileName,
		script,
	}
	fetch("/post-sequelize-script", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(sendData),
	})
		.then((response) => {
			return response.json()
		})
		.then((result) => {
			if (result.success === 1) {
				cb(fileName)
			} else {
				throw new Error("Something went wrong")
			}
		})
		.catch((err) => {
			alert(err, "Something went wrong")
		})
}

function downloadSequelizeScript(fileName) {
	showDownloadButton()
	downloadScriptBtn.setAttribute("href", `/created-scripts/${fileName}.js`)
}
