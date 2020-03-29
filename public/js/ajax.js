$(document).ready(function () {

    var url = $('#url').val();
    var i = 1;
    $('#add_user').click(function(){
        $('#add_button').val("add");
        $('#add_button').text("Add User");
        $('#Mymodal').modal('show');
    });
//Read All Data
    function Read(){
        var my_url = url+"/read";
        $.ajax({
            type: "GET",
            url: my_url,
            //data: formData,
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index) {
                    var Contact = '<tr id="contact' + data[index].id + '">' +
                        '<td>' + i++ + '</td>' +
                        '<td>' + data[index].name + '</td>' +
                        '<td>' + data[index].email + '</td>'+
                        '<td>' + data[index].phone + '</td>'+
                        '<td>' +
                            '<button class="btn btn-warning btn-detail open_modal mr-2" value="' + data[index].id + '" id="edit_user">Edit</button>'+
                            '<button class="btn btn-danger btn-delete delete-contact" value="' + data[index].id + '">Delete</button>';
                        '</td>' +
                        '</tr>';
                    $('#contact_list').append(Contact);
                });
            },
            error: function (data) {
               console.log('Error:', data);
            }
        });
    }
    Read();
    /*setInterval(function () {
        $('#contact_list').empty()
        i=1;
        Read();
    },3000);*/
    //create new product / update existing product ***************************
    $("#add_button").click(function (e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })

        e.preventDefault();
        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
        }
        var my_url = url+"/add";


        var state = $('#add_button').val();
        var type = "POST"; //for creating new resource
        var contact_id = $('#contact_id').val();
        if (state == "update"){
            type = "PUT"; //for updating existing resource
            var my_url = url+"/update/"+contact_id;
        }
        $.ajax({
            type: type,
            url: my_url,
            data: formData,
            dataType: 'json',
            success: function (data) {
                $('#form4user').trigger("reset");
                $('#Mymodal').modal('hide');
                var Contact = '<tr id="contact' + data.id + '">' +
                    '<td>' + i++ + '</td>' +
                    '<td>' + data.name + '</td>' +
                    '<td>' + data.email + '</td>'+
                    '<td>' + data.phone + '</td>'+
                    '<td>' +
                    '<button class="btn btn-warning btn-detail open_modal mr-2" value="' + data.id + '" id="edit_user">Edit</button>'+
                    '<button class="btn btn-danger btn-delete delete-contact" value="' + data.id + '">Delete</button>';
                '</td>' +
                '</tr>';

                if (state == "add"){ //if user added a new record
                    $('#contact_list').append(Contact);
                }else{ //if user updated an existing record
                    $("#contact" + contact_id).replaceWith(Contact);
                }
            },
            error: function (data) {
               console.log('Error:', data);
            }
        });
    });


    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.delete-contact',function(){
        var contact_id = $(this).val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        confirm("Are You Sure To Delete?");
        var my_url = url+"/delete/"+contact_id;
        $.ajax({
            type: "post",
            url: my_url,
            success: function (data) {
                console.log(data);
              //  $("#contact" + contact_id).remove();
                $('#contact_list').empty()
                i=1;
                Read();
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });

    //display modal form for product EDIT ***************************
    $(document).on('click','#edit_user',function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        var contact_id = $(this).val();
        var my_url = url+"/get4update/"+contact_id;
        $.ajax({
            type: "POST",
            url: my_url,
            success: function (data) {
                console.log(data);
                $('#name').val(data.name);
                $('#email').val(data.email);
                $('#phone').val(data.phone);
                $('#add_button').val("update");
                $('#add_button').text("Update User");
                $('#contact_id').val(data.id);
                $('#Mymodal').modal('show');
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });

})


