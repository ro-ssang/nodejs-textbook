const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: "local",
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post); // foreignKey는 자동으로 상대 모델명 + Id, sourceKey나 targetKey는 자신이나 상대방의 primary key이므로 id.
        db.User.belongsToMany(db.User, {
            foreignKey: "followingId",
            as: "Followers",
            through: "Follow",
        });
        db.User.belongsToMany(db.User, {
            foreignKey: "followerId",
            as: "Followings",
            through: "Follow",
        });
    }
};
