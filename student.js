
var student = {} || student;

student.drawTable = function(){
    $.ajax({
        url : "http://localhost:3000/Students/",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#tbStudent').empty();
            $.each(data, function(i, v){
               $('#tbStudent').append(
                  "<tr>"+
                      "<td>"+ v.id +"</td>"+
                      "<td>"+  v.Fullname + "</td>"+
                      "<td><img src='"+ v.Avatar +"'width= '50px' height= '60px' /></td>"+
                      "<td>"+ v.DOB +"</td>"+
                      "<td>"+ v.Class.Name +"</td>"+
                      "<td>"+
                            "<a href='javascript:;' title='edit' onclick='student.get("+ v.id +")'><i class='fa fa-edit'></i></a> "+
                            "<a href='javascript:;' title='remove' onclick='student.delete("+ v.id +")'><i class='fa fa-trash'></i></a> "+
                      "</td>"+
                  "</tr>"

               )
            });

            }
        });
    };
    


    student.openModal = function(){
        student.reset();
        $('#addEditStudent').modal('show');
    };
    
    student.save = function(){
       if($('#formAddEditStudent').valid()){
         if($('#id').val() == 0){
           var studentObj = {};
           studentObj.Fullname = $('#Fullname').val();
           studentObj.Avatar = $('#Avatar').val();
           studentObj.DOB = $('#DOB').val();
           var classObj = {};
           classObj.id = $("#classId").val();
           classObj.Name = $("#classId option:selected").html();
           studentObj.Class = classObj;
           

           $.ajax({
            url : "http://localhost:3000/Students/",
            method : "POST",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(studentObj),
            success : function(data){
                $('#addEditStudent').modal('hide');
                student.drawTable();

            }

           });
         }
         else{
            var studentObj = {};
            studentObj.Fullname = $('#Fullname').val();
            studentObj.Avatar = $('#Avatar').val();
            studentObj.DOB = $('#DOB').val();
            studentObj.id = $('#id').val();
            var classObj = {};
            classObj.id = $("#classId").val();
            classObj.Name = $("#classId option:selected").html();
            studentObj.Class = classObj;
            
            $.ajax({
             url : "http://localhost:3000/Students/" + studentObj.id,
             method : "PUT",
             dataType : "json",
             contentType : "application/json",
             data : JSON.stringify(studentObj),
             success : function(data){
                 $('#addEditStudent').modal('hide');
                 student.drawTable();
 
             }
 
            });

         }

       }
    };


    student.delete = function(id){
        bootbox.confirm({
            title: "Xóa danh sách học sinh ",
            message: "Bạn có muốn xóa học sinh này ? ",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Không'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Có'
                }
            },
            callback: function (result) {
                if(result){
                    $.ajax({
                        url : "http://localhost:3000/Students/" + id,
                        method : "DELETE",
                        dataType : "json", 
                        success : function(data){
                            student.drawTable();
                        }

                    });
                }
            }
        });
    };

    
    student.get = function(id){
         $.ajax({
            url : "http://localhost:3000/Students/" + id,
            method : "GET",
            dataType : "json", 
            success : function(data){
                $('#Fullname').val(data.Fullname);
                $('#Avatar').val(data.Avatar);
                $('#DOB').val(data.DOB);
                $('#id').val(data.id);

                var validator = $( "#formAddEditStudent" ).validate();
                validator.resetForm();
                $('#addEditStudent').modal('show');

            }
         });
    };

    student.reset = function(){
        $('#Fullname').val('');
        $('#Avatar').val('');
        $('#DOB').val('');
        $('#id').val('0');
        var validator = $( "#formAddEditStudent" ).validate();
        validator.resetForm();
    }




    student.initClass = function(){
        $.ajax({
            url : "http://localhost:3000/Classes/",
            method : "GET",
            dataType : "json",
            success : function(data){
                $('#classId').empty();
                $.each(data, function(i, v){
                   $('#classId').append(
                      "<option value='"+ v.id +"'>"+ v.Name +"</option>"
    
                   )
                });
    
                }
            });

    }

    student.init = function(){
         student.drawTable();
         student.initClass();
    };

    $(document).ready(function(){
          student.init();
    });


