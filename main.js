var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
    
    if(harvesters.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new Harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
    
    if(builders.length < 4) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new Builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + builders.length);
    
    if(upgraders.length < 4) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
