import * as $ from 'jquery';

export function authenticatedAjax(ajaxObject: any) {
    ajaxObject['beforeSend'] = function (xhr: any) {
        const token = localStorage.getItem('authorizationToken');
        if (token) {
          xhr.setRequestHeader ("Authorization", token);  
        }
    };

    return $.ajax(ajaxObject);
}