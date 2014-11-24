var Task = function (name) {
    this.name = ko.observable(name);
};
var Cursor = function() {
    this.cursor_x = ko.observable('-2px');
    this.cursor_y = ko.observable('0px');
};
Task.prototype.clone = function() {
    return new Task(this.name());
};

var ViewModel = function() {
    var self = this;
    //===================
    // Task
    //===================
    self.tasks = ko.observableArray([
        new Task("Get dog food"),
        new Task("Mow lawn"),
        new Task("Fix car"),
        new Task("Fix fence"),
        new Task("Walk dog"),
        new Task("Read book")
    ]);
    self.selectedTask = ko.observable();
    self.clearTask = function(data) {
        if (data === self.selectedTask()) {
            self.selectedTask(null);
        }

        if (data.name() === "") {
           self.tasks.remove(data);
        }
    };
    self.isTaskSelected = function(task) {
       return task === self.selectedTask();
    };
    //===================
    // Cursor
    //===================
    self.cursor = ko.observable(new Cursor());
    self.cursorStopped = function(ev,property) {
        var y = ((property.position.top) / 18).toFixed()*18;
        self.cursor().cursor_x('-2px');
        self.cursor().cursor_y(y + 'px');
    };

    //===================
    // Add Task
    //===================
    self.addTask = function() {
        var task = new Task("new");
        self.selectedTask(task);
        self.tasks.push(task);
    };

    //===================
    // Trash
    //===================
    self.trash = ko.observableArray([]);
    self.removeAll = function(arg){
        arg.targetParent.removeAll();
    };

    //===================
    // Sort
    //===================
    self.sortTasks = function(){
        self.tasks.sort(function(left,right){
            var l = left.name().toUpperCase(),
                r = right.name().toUpperCase();
            if (l < r){ return -1; }
            if (l > r){ return +1; }
            return 0;
        });
    };

};

//control visibility, give element focus, and select the contents (in order)
ko.bindingHandlers.visibleAndSelect = {
    update: function(element, valueAccessor) {
        ko.bindingHandlers.visible.update(element, valueAccessor);
        if (valueAccessor()) {
            setTimeout(function() {
                $(element).find("input").focus().select();
            }, 0); //new tasks are not in DOM yet
        }
    }
};

ko.applyBindings(new ViewModel());

