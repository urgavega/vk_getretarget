if (typeof GObj.users == 'undefined')  {GObj.users   = {};}

$(document).ready(function()
{

});








//============================================================================================
// getGroups
$(function()
{
    $('[name=params]')
        .on('click','form [name=filter]',function()
        {
            var self = $(this);
            var sex  = $('[name=params] [name=sex]').val();
            var city = $('[name=params] [name=city_id]').val();
            var age_from    = $('[name=params] [name=age_from]').val();
            var age_to      = $('[name=params] [name=age_to]').val();
            var last_seen   = $('[name=params] [name=last_seen]').val()*1;


            var user_ids_t = $('[name=params] form [name=user_ids]').val().split('\n');
            var arr_user_ids = {};
            var i = 0;
            var ind = 0;
                $.each(user_ids_t, function(index, v) {
                    v = $.trim(v);
                    if ($.trim(v) != '' && $.trim(v) != undefined ) {

                        if (typeof arr_user_ids[ind] == 'undefined')
                            {arr_user_ids[ind] = v;}
                        else
                            {arr_user_ids[ind] = arr_user_ids[ind]+','+v;}

                        i++;

                        if(i == 1000){
                            i = 0;
                            ind++;
                        }
                    }
                    //{arr_user_ids[index] = user_ids_t[index];}
                });


            var num_user_ids = csobjlen(arr_user_ids);
            //log(num_user_ids);return false;


            self.addClass('loader');

            delay_ind = 0;
            $.each(arr_user_ids, function(index, txt_user_ids) {


                users_get(txt_user_ids, function (data) {
                    var users = data;
                    delete (data);


                    if (csobjlen(users) > 0) {

                        $.each(users, function (index, v) {

                            if (sex != v['sex'] && sex != 0) {delete (users[index]);}

                            log(v);

                            if (city != v['city']['id'] && city != 0 && typeof v['city']['id'] != 'undefined') {delete (users[index]);}


                            if (typeof v['bdate'] != 'undefined' && v['bdate'].length >= 8) {

                                var date_bdate = moment(v['bdate'], "DD.MM.YYYY");
                                    date_bdate = date_bdate['_d'];
                                var date_from = (moment().subtract(age_from, 'Y'));
                                    date_from = date_from['_d'];
                                var date_to = (moment().subtract(age_to, 'Y'));
                                    date_to = date_to['_d'];
                                if (date_bdate <= date_from || date_bdate >= date_to) { delete (users[index]); }

                            }


                            if (typeof v['last_seen'] != 'undefined') {

                                var date_last_seen = moment.unix(v['last_seen']['time']);
                                date_last_seen = date_last_seen['_d'];
                                //log(date_last_seen);

                                var date_to = (moment().subtract(last_seen, 'days'));
                                date_to = date_to['_d'];
                                //log(date_to)

                                if (date_last_seen < date_to) { delete (users[index]); }

                            }

                            if (typeof v['deactivated'] != 'undefined') {delete (users[index]);}

                            if (typeof v['maiden_name'] != 'undefined' && v['maiden_name'] != '') {log(v); delete (users[index]);}


                            if (typeof users[index] != 'undefined'){ GObj.users[index] = true; }
                        });
                        delete (users);
                    }



                    num_user_ids--;
                    //log(num_groups);

                    if (num_user_ids == 0){
                        log(GObj.users);

                        $('[name=info_block] [name=info]').text('Найдено контактов: '+csobjlen(GObj.users));
/*
                        var data_src = {datas: JSON.stringify(GObj.users), filename:'users'}
                        csAjax(data_src, 'json_lib__save2csv.php', function(data) {
                            window.location.replace(data.filename);
                            self.removeClass('loader');
                        });*/

                    }
                    //if (num_groups == 1){log(arr_id_group);}

                });



            });
        });
});
//============================================================================================


