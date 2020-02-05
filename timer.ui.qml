import QtQuick 2.4
import QtGraphicalEffects 1.0

Item {
    id: element
    width: 400
    height: 400

    Rectangle {
        id: rectangle2
        x: 0
        y: 0
        width: 401
        height: 401
        color: "#000000"
    }

    Button {
        id: lap
        y: 239
        width: 102
        height: 136
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 25
        anchors.left: parent.left
        anchors.leftMargin: 30

        Rectangle {
            id: rectangle
            x: -2
            y: 0
            width: 104
            height: 139
            color: "#78d51d"
            radius: 60
            anchors.leftMargin: 30
            anchors.bottomMargin: 25
        }
    }

    Rectangle {
        id: rectangle1
        width: 344
        height: 200
        color: "#30cfd0"
        radius: 40
        gradient: Gradient {
            GradientStop {
                position: 0
                color: "#81cbcb"
            }

            GradientStop {
                position: 0.328
                color: "#81cbcb"
            }

            GradientStop {
                position: 1
                color: "#330867"
            }
        }
        visible: true
        opacity: 0.37
        clip: false
        anchors.top: parent.top
        anchors.topMargin: 25
        anchors.left: parent.left
        anchors.leftMargin: 30

        Button {
            id: start_stop
            x: 0
            y: 0
            width: 344
            height: 200
        }
    }

    Text {
        id: timer
        x: 62
        y: 87
        width: 282
        height: 106
        color: "#ffffff"
        text: qsTr("00:00:00")
        styleColor: "#010000"
        textFormat: Text.AutoText
        lineHeight: 10
        fontSizeMode: Text.VerticalFit
        horizontalAlignment: Text.AlignHCenter
        font.pixelSize: 60
    }

    Button {
        id: reset
        x: 272
        y: 239
        width: 102
        height: 136
        anchors.leftMargin: 30
        anchors.bottomMargin: 25
        Rectangle {
            id: rectangle4
            x: -2
            y: 0
            width: 104
            height: 139
            color: "#78d51d"
            radius: 60
            anchors.bottomMargin: 25
            anchors.leftMargin: 30
        }
    }
}

/*##^##
Designer {
    D{i:2;anchors_height:136;anchors_x:33;anchors_y:231}D{i:4;anchors_x:42;anchors_y:27}
D{i:11;anchors_height:136;anchors_x:33;anchors_y:231}
}
##^##*/

