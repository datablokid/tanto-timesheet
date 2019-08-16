var jsHome={
	viewRead:function(){
		let layout='';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>Home</h3>';
		layout += '</div>';
		layout += '<div class="w3-container w3-theme-l5">';
		layout += '<p>Resource URL:  <span class="w3-tag w3-theme-l1">'+ myServer +'</span></p>';
		layout += '<div id="msg"></div>';
		
		if (g.login_blok!=null){
			layout += '<p>User login: <span class="w3-tag w3-theme-l1">'+ g.user_name +'</span></p>';
			layout += '<p>Login blok: <span class="w3-tag w3-theme-l1">'+ g.login_blok +'</span></p>';
			layout += '<p>Full name: <span class="w3-tag w3-theme-l1">'+ g.user_fullname +'</span></p>';
		}
		layout += '</div>';
		layout += '<div class="gold"></div>';		

		document.getElementById('viewMid').innerHTML = layout;
	}
}
