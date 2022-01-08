$(document).ready(() => {
    $("#post-button").click((event) => {
        //stop submit the form -> post manually
        event.preventDefault();
        doAjax("/profile");
        // auto click on close button
        $('#close-button').click()
    });
});

/////////////////////////////////// Add posts by AJAX /////////////////////////////////////
function doAjax(route) {
	var form = $('#postForm')[0];
	var data = new FormData(form);
	
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: route,
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {
            console.log(data)
            $("#new-post").prepend(
                $('<div></div>').load('/load_ajax/post.ejs', function(){
                    
                    // Bind post_id to div post of each new post - AJAX add only
                    $(this).find('.card').attr("id", data.post_id)
                    
                    // Send postID
                    $(this).find('#editButton').html('<a id="editLink" href="#" value="' + data.post_id + '">Edit Post</a>')
                    $(this).find('#delButton').html('<a id="delLink" href="#" value="' + data.post_id + '">Delete Post</a>')
                
                    $(this).find('#username').text(data.user_name)
                    $(this).find('#avatar').attr('src', data.user_avatar)

                    if(data.title !== ''){
                        $(this).find('.title').text(data.title)
                    } else {
                        $(this).find('.title').attr("style", "display:none")
                    }

                    if(data.content !== ''){
                        $(this).find('.post-desc').text(data.content)
                    } else {
                        $(this).find('.post-desc').attr("style", "display:none")
                    }

                    if(data.post_img !== undefined){
                        $(this).find('#post-img')
                        .html(
                            '<div id="post-img" class="post-thumb-gallery img-gallery">' +
                                '<div class="row g-0">' + 
                                    '<div class="col-12">' +
                                        '<figure class="post-thumb">' +
                                            '<a class="gallery-selector" href="' + data.post_img.path + '">' +
                                                '<img src="' + data.post_img.path + '" alt="post image">' +
                                            '</a>' +
                                        '</figure>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        )
                    } else {
                        $(this).find('#post-img').attr("style", "display:none")
                    }

                    if(data.url_youtube !== undefined){
                        $(this).find('#plyr-youtube')
                        // .attr("data-video-id", data.url_youtube)
                        .html(
                        '<div id="plyr-youtube" class="plyr__video-embed plyr-video">' + 
                        '<iframe width="100%" src="https://www.youtube.com/embed/' + data.url_youtube + '" frameborder="0" '+
                        'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                        '</div>'
                        )
                    } else {
                        $(this).find('#plyr-youtube').attr("style", "display:none")
                    }                    
                }) 
            )
        },
        error: (e) => {
            console.log(e);
            $("#confirmMsg").text(e.responseText);
        }
    });
}

/////////////////////////////////// Remove posts by AJAX /////////////////////////////////////
$(document).on("click", "#delLink", function(){
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $(this).parent().find('#delLink').attr("value")

    $.ajax({
        type: "POST",
        url:'/deletePost',
        data: {post_id: post_id},
        success:function(response){
            if(response){
                $('div[id="' + post_id + '"]').remove()
                console.log('Post deleted')
            }else{
                console.log('Post cannot be deleted');
            }
        },
        error:function(response){
            console.log('Server error')
        }
    });
})

/////////////////////////////////// Remove posts by AJAX /////////////////////////////////////
$(document).on("click", "#viewPostButton", function(){
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $(this).parent().find('#viewPostButton').attr("value")

    $.ajax({
        type: "POST",
        url:'/viewPost',
        data: {post_id: post_id},
        success:function(data) {
            console.log(data[0])
            data = data[0]
            $('#viewPost_user-name').text(data.user_name)
            $('#viewPost_user-avatar').attr('src', data.user_avatar)

            if(data.title !== undefined){
                $('#viewPost_post-title').text(data.title)
            } else {
                $('#viewPost_post-title').attr("style", "display:none")
            }

            if(data.content !== undefined){
                $('#viewPost_post-content').text(data.content)
            } else {
                $('#viewPost_post-content').attr("style", "display:none")
            }

            if(data.post_img !== undefined){
                console.log(data.post_img)
                $('#viewPost_post-img')
                .html('<img src="' + data.post_img + '" alt="post image">')
            } else {
                $('#viewPost_post-img').attr("style", "display:none")
            }

            if(data.url_youtube !== undefined){
                console.log(data.url_youtube)

                $('#viewPost_plyr-youtube')
                .attr("data-video-id", data.url_youtube)
            } else {
                $('#viewPost_plyr-youtube').attr("style", "display:none")
            }           
        },
        error:function(response){
            console.log('Server error')
        }
    });
})