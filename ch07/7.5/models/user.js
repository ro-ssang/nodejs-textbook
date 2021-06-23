const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                // sequelize에서는 mySQL 외에도 다른 db도 지원하므로 mySQL의 자료형과 조금 다르다.
                type: Sequelize.STRING(20), // mySQL에서의 VARCHAR(20)
                allowNull: false, // mySQL에서의 NOT NULL
                unique: true, // mySQL에서의 UNIQUE
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED, // mySQL에서의 INT UNSIGNED
                allowNull: false, // mySQL에서의 NOT NULL
            },
            married: {
                type: Sequelize.BOOLEAN,  // mySQL에서의 TINYINT
                allowNull: false, // mySQL에서의 NOT NULL
            },
            comment: {
                type: Sequelize.TEXT,  // mySQL에서의 TEXT
                allowNull: true, // mySQL에서의 NULL
            },
            created_at: {
                type: Sequelize.DATE, // mySQL에서의 DATETIME; DATE: Sequelize.DATEONLY, TIME: Sequelize.TIME
                allowNull: false,  // mySQL에서의 NOT NULL
                defaultValue: Sequelize.NOW,  // mySQL에서의 DEFAULT now()
            }
        }, {
            sequelize,
            timestamps: false, // true면 createdAt, updatedAt 칼럼을 자동으로 만든다.
            underscored: false, // 기본적으로 camel case로 생성되는 칼럼을 snake case로 생성한다.
            modelName: "User", // JS에서 사용할 model 이름
            tableName: "users", // mySQL에서 사용할 table 이름
            paranoid: false, // deletedAt 컬럼을 만든다. 로우 복구를 위해 완전히 삭제하지 않고 deletedAt에 true로 표시한다.
            charset: "utf8", // 이모티콘을 넣으려면 "utf8mb4"
            collate: "utf8_general_ci", // 이모티콘을 넣으려면 "utf8mb4_general_ci"
        })
    }
    static associate(db) {}
}