
(function(){
	const dataPanel = document.getElementById('data-panel')
	const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
	const INDEX_URL = BASE_URL + '/api/v1/users/'
	const POSTER_URL = BASE_URL + '/api/v1/users/:id'
	const data = []
	const showListPanel = document.getElementById("show-list-body")
	const displayField = document.querySelector('#display')
	const FemaleField = document.getElementById('female')
	const MaleField = document.getElementById('male')
	let favoriteArray = JSON.parse(localStorage.getItem('favorItem')) || []
  let selectUser = []
	const pagination = document.getElementById('pagination')
	const ITEM_PER_PAGE = 12
	let paginationData = []
	let j = 0
	
	axios.get(INDEX_URL).then((response) => {
		data.push(...response.data.results)
		display(data)
		let rangeData = data.slice(96 * (j), 96 * (j) + 96)
		getTotalPages(rangeData, j)
		getPageData(1, data)       
	}).catch((err) =>
		console.log(err))
	
	// listen to data panel
	dataPanel.addEventListener('click', (event) => {
		console.log(event.target.dataset.id)
		if (event.target.matches('.btn-show-list')) {
			showList(event.target.dataset.id)
		} else if (selectUser.some(user => user.id === data.id))
			return;
		else if (event.target.matches('.far')) {
			event.target.classList.remove("far")
			event.target.classList.add("fas")
			addFavoriteItem(event.target.dataset.id)
		}
		else if (event.target.matches('.fas')) {
			event.target.classList.remove("fas")
			event.target.classList.add("far")
			removeFavoriteItem(event.target.dataset.id)
		}	
	})	

	// listen to pagination click event
	pagination.addEventListener('click', event => {
		  console.log(event.target)
		if (event.target.matches('.next')) {
			  j++;
				let rangeData = data.slice(96*(j),96*(j)+96)
				
				getTotalPages(rangeData,j)
		  	getPageData((j * 8), data)
				console.log(rangeData)
				console.log(j)					
		}
		else if (event.target.matches('.pre')) {
			j--;
			console.log(j)
			let rangeData = data.slice(96 * (j), 96 * (j) + 96)
			getTotalPages(rangeData, j)
			getPageData((j * 8 + 1), data) 
			console.log(rangeData)
			console.log(j)
		}
		else if (event.target.tagName === 'A') {
			getPageData(event.target.dataset.page)
		}
	})


	function display(data) {
		displayDataList(data)
		displayField.addEventListener('click', (event) => {
			if (event.target.matches('.list')) {
				console.log(this)
				console.log(event.target)
				displayDataList(data)
			} else if (event.target.matches('.card')) {
				console.log(this)
				console.log(event.target)
				displayDataCard(data)
			}

		})
	}

		
	function displayDataList(data) {
		let htmlContent = 
		data.map(item => {
			return `

		<div class="row col-sm-12" style = "margin-bottom:10px;">
				<img class="card-img-top " style="cursor: pointer; height:50px;width:50px;"
			src="${item.avatar}"  alt="Card image cap">
				<h5 class="col-sm-2" style ="vertical-algin:middle;">${item.name}</h5>
				<p class="col-sm-7" style="padding:0px 20px;display:">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, earum?</p>

     <!-- "More" button -->
				<button class="btn btn-info btn-xs col-sm-1 btn-show-list" data-toggle="modal" data-target="#show-list-modal " data-id="${item.id}"
				style = "margin-right:5px;height: 50%;padding: initial;">More</button>
			<!-- favorite button -->
					<span><i class="heart far fa-heart col-sm-1 btn-add-favorite" data-id="${item.id}" style="cursor: pointer; color: red" ; padding-top:7px;"></i></span>
					
		</div>	
		`
		}).join("")

		return dataPanel.innerHTML = htmlContent		
	}



function displayDataCard(data) {
	let htmlContent =
	data.map(item => {
	return `
  <div class="col-sm-3">
    <div class="card mb-2">
			<img class="card-img-top btn-show-list" style="cursor: pointer;"  
			src="${item.avatar}"  alt="Card image cap"
			 data-toggle="modal" data-target="#show-list-modal" data-id="${item.id}">
			<div class="card-body list-item-body" style="padding: 5px;">
				<div class="card-title row">
				<h5 class = "col-8" style="text-align: center;">${item.name}</h5>
				<span><i class="heart far fa-heart col-4 btn-add-favorite" data-id="${item.id}" style="cursor: pointer; color: red" ; padding-top:7px;"></i></span>
			  </div>
				
      </div>
    </div>
  </div>  
`
		
	}).join("")	
	return dataPanel.innerHTML = htmlContent	
}

// function markedItem(id){
// 	console.log(this)
// 	let favoriteArray = JSON.parse(localStorage.getItem('favorItem')) || []
// 	let markedfield = document.getElementById(".card-body")
	
	

// 		li = markedfield.querySelector('heart')

// 		console.log(li)
// 		li.classList.remove("far")
// 		li.classList.add("fas")
	
// }


function showList(id) {
	event.preventDefault()

	// get elements
	const ModalTitle = document.getElementById('show-list-title')
	const ModalImage = document.getElementById('show-list-image')
	const ModalDate = document.getElementById('show-list-date')
	const ModalDescription = document.getElementById('show-list-description')
	const ModalRegion = document.getElementById('show-list-region')
	const ModalEmail = document.getElementById('show-list-email')

  // set request url
  const URL = INDEX_URL + id
  console.log(URL)

 // send request to show api
  	axios.get(URL).then(response => {
		const selectUser= response.data
		console.log(selectUser)

		// insert data into modal ui
		ModalTitle.textContent = selectUser.surname
		ModalImage.innerHTML = `<img src="${selectUser.avatar}"  class="img-fluid" alt="Responsive image">`
		ModalDate.textContent = `${selectUser.name}`
		ModalDescription.textContent = `age : ${selectUser.age}`
		ModalRegion.textContent = `Region: ${selectUser.region}`
		ModalEmail.textContent = `${selectUser.email}`
    
	})
}

	

// add user to Favorite
function addFavoriteItem(id) {
	//let favoriteArray = JSON.parse(localStorage.getItem('favorItem')) || []
	let User = data.find(item => item.id === Number(id))	
	if (favoriteArray.some(item => item.id === Number(id))) {	
		alert(`${User.name} is already in your favorite list.`)
	} else {
		favoriteArray.push(User)
		alert(`Added ${User.name} to your favorite list!`)
		console.log(favoriteArray)
	}
	localStorage.setItem('favorItem', JSON.stringify(favoriteArray))

}

// remove favorite item
	function removeFavoriteItem(id) {
		
		//let favoriteArray = JSON.parse(localStorage.getItem('favorItem')) || []
		const index = data.findIndex(item => item.id === Number(id))
		if (index === -1) return

		// remove movie and update localStorage
		console.log(favoriteArray)
		favoriteArray.splice(index, 1)
		localStorage.setItem('favorItem', JSON.stringify(favoriteArray))

		// repaint dataList
		//displayDataList(data)
		//display(data)
	}
// PRESS Female to get only Female list
FemaleField.addEventListener('click', function () {
	console.log(this)
	console.log(event.target)
	// filter female
	let FemaleArray = data.filter(function (element, index, arr) {
		return element.gender === 'female';

	})
	console.log(FemaleArray)
	display(FemaleArray)
})

// PRESS male to get only male list
MaleField.addEventListener('click', function () {
	console.log(this)
	console.log(event.target)
	// filter female
	let maleArray = data.filter(function (element, index, arr) {
		return element.gender === 'male';

	})
	console.log(maleArray)
	display(maleArray)
})

	//////pagination/////

	function getTotalPages(data,j) {
		
		console.log(data)
		console.log(j)
		let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
		let pageItemContent = ''
    
		
		 pageItemContentPre = `
		   <li class="page-item">
				<a class="pre page-link" href="#">
					<span aria-hidden="true">&laquo;</span>
					<span class="sr-only">Previous</span>
				</a>
			</li>
		 `
		
		  for (let i = 0; i < 8; i++) {
			pageItemContent += `
			  
			<li class="page-item">
			<a class="page-link" href="javascript:;" data-page="${(i + 1)+(j * 8)}">${(i + 1)+(j * 8)}</a>
			</li>
			`
		}
			pageItemContentNext = `
		  <li class="page-item">
				<a class="next page-link" href="#" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
					<span class="sr-only">Next</span>
				</a>
			</li>
		 `
		
		pagination.innerHTML = pageItemContentPre + pageItemContent + pageItemContentNext

	}
	// //get total pages
	// axios.get(INDEX_URL).then((response) => {
	// 	data.push(...response.data.results)
	// 	let rangeData = data.slice(96 * (j), 96 * (j) + 96)
	// 	getTotalPages(rangeData, j)
	// 	// displayDataList(data)
	// 	getPageData(1, data)       // add this
	// }).catch((err) => console.log(err))

	function getPageData(pageNum, data) {
		paginationData = data || paginationData
		let offset = (pageNum - 1) * ITEM_PER_PAGE
		let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
		display(pageData)
	}
})()