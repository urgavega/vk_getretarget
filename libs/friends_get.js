if (typeof GObj.users == 'undefined')  {GObj.users   = {};}

$(document).ready(function()
{

});








//============================================================================================
$(function()
{
    $('[name=params]')
        .on('click','form [name=ok]',function()
        {
            var self = $(this);
            var sex  = $('[name=params] [name=sex]').val();
            var city = $('[name=params] [name=city_id]').val();
            var age_from    = $('[name=params] [name=age_from]').val();
            var age_to      = $('[name=params] [name=age_to]').val();
            var last_seen   = $('[name=params] [name=last_seen]').val()*1;
            var entrance    = $('[name=params] [name=entrance]').val()*1;
            var relation_exclude      = $('[name=params] form [name=relation_exclude]').val().split(',');




            var ids_users_t = $('[name=params] form [name=ids_users]').val().split('\n');
            var arr_ids_users = {};
            var i = 0;
            $.each(ids_users_t, function(index, v) {
                var user_id_m = v.replace(/[^0-9]/gim,'');
                if (user_id_m != '' && user_id_m != undefined ) {i++; arr_ids_users[i] = user_id_m;}
            });
            var num_ids_users = csobjlen(arr_ids_users);


            self.addClass('loader');

            delay_ind = 0;
            $.each(arr_ids_users, function(index_main, user_id) {


                friends_get(user_id, function (data) {
                    var users = data;
                    //log(data);return false;
                    delete (data);

                    log('==================================');
                    log('user_id = '+user_id);
                    log('count of users = '+csobjlen(users));

                    if (csobjlen(users) > 0) {

                        $.each(users, function (index, v) {

                            users[index]['count_group'] = 1;

                            if (sex != v['sex'] && sex != 0) {delete (users[index]);}


                            if (typeof v['city']['id'] != 'undefined' && city != v['city']['id'] && city != 0) {delete (users[index]);}


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



                            if (typeof v['relation'] != 'undefined' && v['relation'] != '' && $.inArray( v['relation']+'', relation_exclude ) != -1) {delete (users[index]);}




                            if (typeof users[index] != 'undefined'){

                                if (typeof GObj.users[index] == 'undefined'){
                                    GObj.users[index] = users[index]['count_group'];
                                }
                                else { GObj.users[index]++; }
                            }
                        });
                        delete (users);
                    }



                    num_ids_users--;
                    log('num_ids_users = '+num_ids_users);
                    delete (arr_ids_users[index_main]);
                    log('count of ids_users = '+csobjlen(arr_ids_users));

                    $('[name=info_block] [name=countdown_users]').text('Осталось обработать юзеров: '+csobjlen(arr_ids_users));

                    if (csobjlen(arr_ids_users) == 2){log(arr_ids_users);}

                    if (csobjlen(arr_ids_users) == 0){

                        $.each(GObj.users, function(index, v) {

                            if (v < entrance){ delete (GObj.users[index]);}
                            //else {log(index+' - '+v);}
                        });
                        log(csobjlen(GObj.users));

                        $('[name=info_block] [name=info]').text('Найдено контактов: '+csobjlen(GObj.users));

                        if (csobjlen(GObj.users) > 0) {
                            alert('Дождитесь окончания сохранения. Это может быть долго.');
                            var data_src = {datas: JSON.stringify(GObj.users), filename: 'friends'}
                            csAjax(data_src, 'json_lib__save2csv.php', function (data) {
                                window.location.replace(data.filename);
                                self.removeClass('loader');
                            });
                        }
                        else{self.removeClass('loader');}
                    }
                    //if (num_groups == 1){log(arr_id_group);}
                });



            });
        });
});
//============================================================================================


