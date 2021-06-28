const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                content: {
                    type: Sequelize.STRING(140),
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Post",
                tableName: "posts",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Post.belongsTo(db.User); // foreignKey는 자동으로 상대 모델명 + Id, sourceKey나 targetKey는 자신이나 상대방의 primary key이므로 id.
        db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    }
};
