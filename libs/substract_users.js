if (typeof GObj.users == 'undefined')  {GObj.users   = {};}

$(document).ready(function()
{

});




// ================================================================================
// fileupload_word_list_import
$(function() {
    var fileElementId           = 'fileupload_users_import';
    $('[name=import_cont]').on('click', '[name=btn_'+fileElementId+']', function () {
        var self = $(this);

        var data_src = {};
        var file_name               = $('#'+fileElementId).val();
        var ajax_fileupload_handler = 'ajax_'+fileElementId+'.php';
        var response = ajaxFileUpload(file_name, self, ajax_fileupload_handler, fileElementId, data_src, function (data){
            //location.reload() ;
            //log(data.users);
            if (csobjlen(GObj.users) == 0){
                $.each(data.users, function (index, v) {
                    GObj.users[v] = true;
                });
            }
            else{
                $.each(data.users, function (index, v) {
                    delete (GObj.users[v]);
                });

                self.addClass('loader');
                var data_src = {datas: JSON.stringify(GObj.users), filename:'substract'}
                csAjax(data_src, 'json_lib__save2csv.php', function(data) {
                    window.location.replace(data.filename);
                    self.removeClass('loader');
                });
            }
            $('[name=countdown_users]').text('Найдено: '+csobjlen(GObj.users));
        });

    });
});
// fileupload_word_list_import
// ================================================================================
