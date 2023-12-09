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
  console.log('dom loaded')
  document.querySelectorAll('.delete-row-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      console.log('clicked')
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
btn.addEventListener('click', function (e) {
  e.preventDefault()
  let obj = {}
  let form = new FormData(document.getElementById('my-form'))
  for (let [key, value] of form) {
    console.log(key)

    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]]
      }
      obj[key].push(value)
    } else {
      obj[key] = value
    }
  }
  console.log(obj)
})
function makeSequelizeScript(columnName, dataType, allowNull) {
  console.log(columnName, dataType, allowNull)
  console.log(`
        ${columnName} : {
          type: Sequelize.${dataType.toUpperCase()}, 
          allowNull: ${allowNull ? true : false}
        } 
      `)
}
