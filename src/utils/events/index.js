//自定义事件系统，避免当需要使用自定义事件带来一些兼容性问题，这里可以直接进行相应的调用

const _listener = {};
const _hooks = {};
export default class Events {
    constructor(args) {}

    attach(target) {
        var ev = this;
        target.on = ev.on;
        target.fire = ev.fire;
        target.remove = ev.remove;
        target.method = ev.method;
        target.callcall = ev.call;
        target._listener = {};
        target._hooks = {};
        return target;
    }

    // 监听事件
    on(type, fn, scope = this) {
        const listener = this._listener || _listener;
        if (typeof type === "string" && typeof fn === "function") {
            if (typeof listener[type] === "undefined") {
                listener[type] = [
                    {
                        scope: scope,
                        callback: fn
                    }
                ];
            } else {
                // 对应scope下只能有一次监听fn
                if (listener[type].filter(listen => listen.scope === scope && listen.callback === fn).length === 0) {
                    listener[type].push({
                        scope: scope,
                        callback: fn
                    });
                }
            }
        }
        return this;
    }
    // 发送事件
    fire(type) {
        const listener = this._listener || _listener;
        if (type && listener[type]) {
            var events = [];
            if (arguments.length > 1) {
                for (let index = 1; index < arguments.length; index++) {
                    events.push(arguments[index]);
                }
            }
            for (var length = listener[type].length, start = 0; start < length; start += 1) {
                let listen = listener[type][start];
                listen.callback.apply(listen.scope, events);
            }
        }
        return this;
    }
    // 删除事件
    remove(type, key, scope = this) {
        const listener = this._listener || _listener;
        var listeners = listener[type];
        if (listeners instanceof Array) {
            if (typeof key === "function") {
                for (var i = 0, length = listeners.length; i < length; i += 1) {
                    if (listeners[i].callback === key && listeners[i].scope === this) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            } else if (key instanceof Array) {
                for (var lis = 0, lenkey = key.length; lis < lenkey; lis += 1) {
                    this.remove(type, key[lenkey], scope);
                }
            } else {
                delete listener[type];
            }
        }
        return this;
    }
    // 监听一个方法
    method(name, fn) {
        const hooks = this._hooks || _hooks;
        if (hooks[name] !== undefined) {
            throw new Error("can't override hook: " + name);
        }
        hooks[name] = fn;
    }
    // 移除一个方法
    methodRemove(name) {
        const hooks = this._hooks || _hooks;
        delete hooks[name];
    }
    // 执行一个方法
    call(name) {
        const hooks = this._hooks || _hooks;
        if (hooks[name]) {
            var args = Array.prototype.slice.call(arguments, 1);
            try {
                return hooks[name].apply(null, args);
            } catch (ex) {
                console.info("%c%s %c(method error)", "color: #06f", name, "color: #f00");
                console.log(ex.stack);
            }
        }
        return null;
    }
}
