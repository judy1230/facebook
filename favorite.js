(function () {
	const dataPanel = document.getElementById('data-panel')
	const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
	const INDEX_URL = BASE_URL + '/api/v1/users/'
	const POSTER_URL = BASE_URL + '/api/v1/users/:id'
	//const data = []
	const showListPanel = document.getElementById("show-list-body")
	//const displayField = document.querySelector('#display')
	let selectUser = []
	const data = JSON.parse(localStorage.getItem('favorItem')) || []
	const List = document.querySelector('#display')

  console.log(data)
	display(data)

	function display(data) {
		displayDataCard(data)

		List.addEventListener('click', (event) => {
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

	function displayDataCard(data) {
		let htmlContent =
			data.map(item => {
				return `
  <div class="col-sm-3">
    <div class="card mb-2">
			<img class="card-img-top " style="cursor: pointer;"  
			src="${item.avatar}"  alt="Card image cap"
			 data-toggle="modal" data-target="#show-list-modal" data-id="${item.id}">
      <div class="card-body list-item-body" style="padding: 5px;">
				<h5 class="card-title" 
				style="text-align: center;">${item.name}</h5>
				<span><i class="fas fa-minus-circle btn-remove-favorite" data-id="${item.id}" style="cursor: pointer; color: red ; padding-top:7px;"></i></span>
      </div>
    </div>
  </div>  
`
			}).join("")
		return dataPanel.innerHTML = htmlContent
	}

	function displayDataList(data) {
		console.log(this)
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



	dataPanel.addEventListener('click', (event) => {
		if (event.target.matches('.btn-show-list')) {
			showMovie(event.target.dataset.id)
		} else if (event.target.matches('.btn-remove-favorite')) {
			removeFavoriteItem(event.target.dataset.id)
		}
	})

	function removeFavoriteItem(id) {
		// find movie by id
		const index = data.findIndex(item => item.id === Number(id))
		if (index === -1) return

		// remove movie and update localStorage
		data.splice(index, 1)
		localStorage.setItem('favorItem', JSON.stringify(data))

		// repaint dataList
		//displayDataList(data)
		display(data)
	}

})()