import sys

from PyQt5.QtCore import QDateTime, QObject, QUrl, pyqtSignal
from PyQt5.QtWidgets import QApplication
from PyQt5.QtQml import QQmlApplicationEngine
from PyQt5.QtQuick import QQuickView

app = QApplication(sys.argv)

# Create the QML user interface.
# engine = QQmlApplicationEngine()
# engine.load(QUrl('timer.ui.qml'))

view = QQuickView()
view.setSource(QUrl.fromLocalFile('timer.ui.qml'))
view.show()


app.exec_()
