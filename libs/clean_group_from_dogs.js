if (typeof GObj.users == 'undefined')  {GObj.users   = {};}

$(document).ready(function()
{

});











//============================================================================================
// getGroups
$(function()
{
    $('[name=params]')
        .on('click','form [name=ok]',function()
        {
            var self = $(this);

            var id_group = $('[name=get_users_from_group] form [name=id_group]').val();

            groups_getById (group_id,function(data){
                log(data);
            });

            /*
            self.addClass('loader');
            groups_getMembers (id_group, function(data){
                    GObj.users = data;
                    self.removeClass('loader');
                });*/


        });
});
//============================================================================================


