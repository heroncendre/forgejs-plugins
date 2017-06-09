
var ForgePlugins = ForgePlugins || {};

/**
 */
ForgePlugins.EditorHistory = function(editor)
{
    this._editor = editor;

    this._initialState = null;

    this._index = -1;

    this._limit;

    this._states = [];
};

ForgePlugins.EditorHistory.prototype =
{

    add: function(name)
    {
        var state =
        {
            name: name,
            hotspots: this._editor.dump(),
            selected: this._editor.selected
        };

        if(this._initialState === null && this._states.length === 0)
        {
            this._initialState = state;
        }

        this._states.push(state);

        if(this._states.length === this._limit)
        {
            this._states.splice(0, 1);
        }

        this._index = this._states.length - 1;

        console.log("History Add | index: " + this._index);
    },

    undo: function()
    {
        if(this._index <= 0)
        {
            console.log("History | no more history to undo");
            return;
        }

        console.log("History undo");

        this._index--;
        this.load(this._index);
    },

    redo: function()
    {
        if(this._index === this._states.length - 1)
        {
            console.log("History | no more history to redo");
            return;
        }

        console.log("History redo");

        this._index++;
        this.load(this._index);
    },

    load: function(index)
    {
        var state = this._states[index];
        var hotspots = state.hotspots;

        this._editor.load(hotspots);
        this._editor.selected = state.selected;

        console.log("History load | index: " + this._index);
    },

    reset: function()
    {
        this._states = [];
        this._index = -1;
        this._initialState = null;
    },

    update: function()
    {

    },

    /**
     * Destroy the container and its flags
     */
    destroy: function()
    {
        this._container = null;
    }
};

/**
 * States accessor
 * @name ForgePlugins.EditorHistory#states
 * @readonly
 */
Object.defineProperty(ForgePlugins.EditorHistory.prototype, "states",
{
    get: function()
    {
        return this._states;
    }
});