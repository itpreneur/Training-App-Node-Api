'use strict';

import _ from 'lodash';
import Helper from 'app/helper';

let CourseTransformer = {

    transform: (data) => {
        if (Array.isArray(data)) {
            let output = [];
            _.forEach(data, (course) => {
                output.push(CourseTransformer._transform(course));
            });
            return output;

        } else {
            return CourseTransformer._transform(data);
        }
    },
    _transform: (data) => {
        if (!data) {
            return {};
        }
        // console.log(data.title + data.WelcomeV_ideo_id);
        return {
         id: data._id,
         user:data.user,
         Title: data.Title,
         Description: data.Description,
         ID: data.ID,
         Link : data.Link,
         WelcomeV_ideo_id: data.WelcomeV_ideo_id,
         ShortDescription: data.ShortDescription,
         Thumbnails: data.Thumbnails
        };
    }
}
export default CourseTransformer;
