// $.ajax({
//     url: "https://fakestoreapi.com/products",
//     success: function(response){
//         let data = response;        
//         let html = $.map(data, function(el){
//             return `<tr>
//                         <td scope="row">${el.id}</td> 
//                         <td scope="row">${el.title}</td> 
//                         <td scope="row">${el.price}</td> 
//                     </tr>
//                     `
//         })
//         $("#table-data").html(html)
//     }
// })

const tableHeadings = [
    {title: "ID"},
    {title: "TITLE"},
    {title: "PRICE"},
    {title: "DESCRIPTION"},
    {title: "Option"},
]

let data = $.map(tableHeadings, function(el){
    return `<th scope="col">${el.title}</th>`
})
$("#table-heading").html(data)

$.