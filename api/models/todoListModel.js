'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
//  latlon: {
//    type: String,
//    default: '0,0'
//  },
  geo: {
    lat: {
    type: String,
    default: '0'
    },
    lng: {
    type: String,
    default: '0'
    }
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

var PicPathSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the picture'
  },
  urlpath: {
    type: String,
    required: 'Kindly enter the url/directory of the picture'
  },
  comment: {
    type: [],
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  Created_user: {
    type: String,
    default: 'sky'
  },
  like: {
    type: Number,
    default: '0'
  },
  dislike: {
    type: Number,
    default: '0'
  }
});

var UserInfoSchema = new Schema({
  username: {
    type: String,
    required: 'Kindly enter new username',
    unique : true
  },
  password: {
    type: String,
    required: 'Kindly enter the new password'
  },
  email: {
    type: String,
    required: 'Kindly enter the your email address'
  },
  address: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
module.exports = mongoose.model('PicPaths', PicPathSchema);
module.exports = mongoose.model('UserInfos', UserInfoSchema);
