'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var BlockService = require('../../../lib/services/block');
var LRU = require('lru-cache');
var constants = require('../../../lib/constants');

describe('Blocks Provision', function() {
  var block;

  before(function(done) {
    block = new BlockService({
      node: {
        name: 'block',
        on: sinon.stub()
      }
    });
    block.start(done);
  });

// will need tips, opts
  it('should process block operations', function() {
    //expect(block.processBlockOperations())
  });
});
