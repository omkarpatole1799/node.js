let addRowBtn = document.querySelector('#add-row-button')
let btn = document.querySelector('#submit-button')
let columnName = document.querySelector('#column-name')
let dataType = document.querySelector('#data-type')
let allowNull = document.querySelector('#allow-null')

addRowBtn.addEventListener('click', function (e) {
  e.preventDefault()
  addNewRow()
  update()
})

function update() {
  document.querySelectorAll('.delete-row-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.target.parentElement.parentElement.remove()
    })
  })
}

let num = 0
function addNewRow() {
  num++
  document.querySelector('.tbody').insertAdjacentHTML(
    'beforeend',
    `
	<tr>
        <td><input type="text" name='row-${num}' /></td>
        <td><input type="text" name="row-${num}" /></td>
        <td><input type="checkbox" name="row-${num}" checked='true'/></td>
		<td><button class='delete-row-btn' type='button'>Delete</button></td>
    </tr>
`
  )
}
let all = ''

btn.addEventListener('click', function (e) {
  e.preventDefault()
  let tableName = document.getElementById('table-name').value
  let obj = {}
  let form = new FormData(document.getElementById('my-form'))
  console.log(typeof obj, typeof form)
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
  all += returnCommonSequelizeScript(tableName, obj)
  // document.getElementById('preview-script').value = ''
  // document.getElementById('preview-script').value = all
  getSequelizeScript(all)
})

function returnCommonSequelizeScript(tableName, obj) {
  return `
	const Sequelize = require('sequelize')	
	const sequelize = require('../../config/db.connect.js')

	export const ${tableName} = sequelize.define('${tableName}', {
		id:{ 
			  type:Sequelize.INTEGER, 
		    allowNull: false, 
		    primaryKey: true, 
		    autoIncrement: true
		},
		${makeTableColumns(obj)}	
	})
	`
}

function makeTableColumns(obj) {
  let columns = ''
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

async function getSequelizeScript(script) {
  let response = await fetch('/post-sequelize-script', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ script }),
  })
  let data = await response.json()
  console.log(data)
  if (data.success === 1) {
    downloadSequelizeScript()
  } else {
    alert('Something went wrong')
  }
}
function downloadSequelizeScript() {
  window.open('/get-sequelize-file')
  setTimeout(() => {
    location.reload()
  }, 1000)
}
