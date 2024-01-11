import userModel from '../models/user.js';
import chatModel from '../models/chat.js';

import Connection from './connection.js';

chatModel.belongsTo(userModel, { foreignKey: 'userId' });
userModel.hasMany(chatModel, { foreignKey: 'userId' });

await Connection.sync();