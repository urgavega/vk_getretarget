if (typeof GObj.groups      == 'undefined')  {GObj.groups       = {};}
if (typeof GObj.contacts    == 'undefined')  {GObj.contacts     = {};}

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
            var city_id = $('[name=params] [name=city_id]').val();
            var members_count   = $('[name=params] [name=members_count]').val()*1;


            var q = $('[name=params] form [name=q]').val().split('\n');
                var arr_q = {};
                $.each(q, function(index, v) {
                    q[index] = $.trim(v);
                    if ($.trim(q[index]) != '' && $.trim(q[index]) != undefined ) {arr_q[index] = q[index];}
                });
            delete (q);


            var num_q = csobjlen(arr_q);


            self.addClass('loader');

            delay_ind = 0;
            $.each(arr_q, function(index, q) {


                //setTimeout(function(){
                    groups_search(q, city_id, function (data) {
                        var arr_groups = data;
                        delete (data);



                        //log('==================================');
                        //log(q);
                        //log(csobjlen(arr_groups));


                        if (csobjlen(arr_groups) > 0) {
                            $.each(arr_groups, function (index, v) {
                                if (v['members_count'] >= members_count)  {GObj.groups[index] = true;}
                                //log(v['contacts']);return false;

                                if (typeof v['contacts'] != 'undefined'){
                                    $.each(v['contacts'], function (index1, v1) {
                                        if (v1['user_id'] != undefined){GObj.contacts[v1['user_id']] = true;}
                                    });
                                }
                            });
                            delete (arr_groups);
                        }


                        $('[name=info_block] [name=info]').text('Найдено групп: '+csobjlen(GObj.groups));
                        num_q--;
                        //log(num_q);

                        $('[name=info_block] [name=countdown_q]').text('Осталось обработать запросов: '+num_q);
                        if (num_q == 0)
                        {
                            var data_src = {datas: JSON.stringify(GObj.contacts), filename:'contacts'}
                            csAjax(data_src, 'json_lib__save2csv.php', function(data) {
                                window.location.replace(data.filename);

                                var data_src = {datas: JSON.stringify(GObj.groups), filename:'groups'}
                                csAjax(data_src, 'json_lib__save2csv.php', function(data) {
                                    window.location.replace(data.filename);
                                    self.removeClass('loader');
                                });
                            });


                        }
                        //if (num_groups == 1){log(arr_id_group);}
                    });
                //}//}, 500 * i);
            });
        });
});
//============================================================================================