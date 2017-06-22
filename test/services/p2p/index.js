'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var P2PService = require('../../../lib/services/p2p');
var LRU = require('lru-cache');


var constants = require('../../../lib/constants');

describe('P2P Service', function() {
  var p2p;
  //var testEmitter;
  var inventory;

  before(function(done) {
    p2p = new P2PService({
      node: {
        name: 'p2p',
        on: sinon.stub()
      }
    });
    inventory = p2p._inv;
    sinon.stub(p2p, '_initPool');
    p2p._pool = new EventEmitter();
    p2p.start(done);
  });

  it('should get the mempool from the network', function() {
    var sendMessage = sinon.stub();
    var peer = { sendMessage: sendMessage };
    var getPeer = sinon.stub(p2p, '_getPeer').returns(peer);
    p2p.getMempool();
    expect(getPeer.calledOnce).to.be.true;
    expect(sendMessage.calledOnce).to.be.true;
    getPeer.restore();
  });

  it('should get blocks from peers', function() {
    var sendMessage = sinon.stub();
    var peer = { sendMessage: sendMessage };
    var getPeer = sinon.stub(p2p, '_getPeer').returns(peer);
    var filter = constants.BITCOIN_GENESIS_HASH.regtest;
    p2p.getBlocks({ startHash: filter });
    expect(getPeer.calledOnce).to.be.true;
    expect(sendMessage.calledOnce).to.be.true;
    getPeer.restore();
  });

  it('should get the headers from peers', function() {
    var sendMessage = sinon.stub();
    var peer = { sendMessage: sendMessage };
    var getPeer = sinon.stub(p2p, '_getPeer').returns(peer);
    var filter = constants.BITCOIN_GENESIS_HASH.regtest;
    p2p.getHeaders({ startHash: filter });
    expect(getPeer.calledOnce).to.be.true;
    expect(sendMessage.calledOnce).to.be.true;
    getPeer.restore();
  });

  it('should clear the inventory', function() {
    p2p.clearInventoryCache();
    expect(inventory).to.be.empty;
  })

  after(function(done) {
    p2p._initPool.restore();
    //p2p.stop(done);
  });
});
