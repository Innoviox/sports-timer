import QtQuick 2.4
import QtGraphicalEffects 1.0
import QtQuick.Controls 2.0

Item {
    id: element
    width: 400
    height: 400

    Rectangle {
        id: background
        x: 0
        y: 0
        width: 401
        height: 401
        color: "#000000"
    }

    Rectangle {
        id: timer_background
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
            height: 192
            text: qsTr("Button")
            visible: false
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

    Rectangle {
        id: lap_background
        x: 30
        y: 262
        width: 87
        height: 106
        color: "#21ef3a"
        radius: 40
        border.width: 1

        Button {
            id: lap
            x: 0
            y: 0
            width: 87
            height: 106
            text: qsTr("Button")
            visible: false
        }
    }

    Rectangle {
        id: reset_background
        x: 287
        y: 262
        width: 87
        height: 106
        color: "#21ef3a"
        radius: 40
        border.width: 1

        Button {
            id: reset_button
            x: 0
            y: 0
            width: 87
            height: 106
            text: qsTr("Button")
            visible: false
        }
    }
}



