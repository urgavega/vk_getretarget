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
            var group_id  = $('[name=params] [name=group_id]').val();

            var ids_users_t = $('[name=params] form [name=ids_users]').val().split('\n');
            var arr_ids_users = {};
                $.each(ids_users_t, function(index, v) {
                    ids_users_t[index] = $.trim(v);
                    if ($.trim(ids_users_t[index]) != '' && $.trim(ids_users_t[index]) != undefined ) {arr_ids_users[index] = ids_users_t[index];}
                });
            var num_ids_users = csobjlen(arr_ids_users);


            self.addClass('loader');

            delay_ind = 0;
            $.each(arr_ids_users, function(index, user_id) {

                groups_invite(user_id, group_id, function (data) {

                    arr_ids_users[index] = data;
                    delete (data);

                    num_ids_users--;
                    $('[name=info_block] [name=countdown_users]').text('Осталось обработать юзеров: '+num_ids_users);

                    if (num_ids_users == 0){
                        var num_users_invited = 0;
                        $.each(arr_ids_users, function(index, v) { if (v == 1){ num_users_invited++;} });

                        $('[name=info_block] [name=info]').text('Приглашено контактов: '+num_users_invited);
                    }
                });



            });
        });
});
//============================================================================================


