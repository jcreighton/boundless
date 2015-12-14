"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_UIView2=require("../UIView"),_UIView3=_interopRequireDefault(_UIView2),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_noop=require("../UIUtils/noop"),_noop2=_interopRequireDefault(_noop),UICheckbox=function(_UIView){function UICheckbox(){return _classCallCheck(this,UICheckbox),_possibleConstructorReturn(this,Object.getPrototypeOf(UICheckbox).apply(this,arguments))}return _inherits(UICheckbox,_UIView),_createClass(UICheckbox,[{key:"initialState",value:function(){return{id:this.props.inputProps.id||this.uuid()}}},{key:"componentDidMount",value:function(){this.props.indeterminate&&this.setIndeterminate()}},{key:"componentDidUpdate",value:function(prevProps){prevProps.indeterminate!==this.props.indeterminate&&this.setIndeterminate()}},{key:"setIndeterminate",value:function(){this.refs.input.indeterminate=!!this.props.indeterminate}},{key:"ariaState",value:function(){return this.props.indeterminate?"mixed":String(this.props.checked)}},{key:"handleChange",value:function(){this.props[this.props.checked?"onUnchecked":"onChecked"](this.props.name)}},{key:"renderInput",value:function(){return _react2.default.createElement("input",_extends({},this.props.inputProps,{ref:"input",type:"checkbox",id:this.state.id,className:(0,_classnames2.default)(_defineProperty({"ui-checkbox":!0,"ui-checkbox-mixed":this.props.indeterminate,"ui-checkbox-checked":this.props.checked,"ui-checkbox-unchecked":!this.props.indeterminate&&!this.props.checked},this.props.inputProps.className,!!this.props.inputProps.className)),name:this.props.name,checked:this.props.checked,"aria-checked":this.ariaState(),onChange:this.handleChange.bind(this),value:this.props.value}))}},{key:"renderLabel",value:function(){return this.props.label?_react2.default.createElement("label",_extends({},this.props.labelProps,{ref:"label",className:(0,_classnames2.default)(_defineProperty({"ui-checkbox-label":!0},this.props.labelProps.className,!!this.props.labelProps.className)),htmlFor:this.state.id}),this.props.label):void 0}},{key:"render",value:function(){return _react2.default.createElement("div",_extends({},this.props,{ref:"wrapper",className:(0,_classnames2.default)(_defineProperty({"ui-checkbox-wrapper":!0},this.props.className,!!this.props.className))}),this.renderInput(),this.renderLabel())}}]),UICheckbox}(_UIView3.default);UICheckbox.propTypes={checked:_react2.default.PropTypes.bool,indeterminate:_react2.default.PropTypes.bool,inputProps:_react2.default.PropTypes.object,label:_react2.default.PropTypes.node,labelProps:_react2.default.PropTypes.object,name:_react2.default.PropTypes.string.isRequired,onChecked:_react2.default.PropTypes.func,onUnchecked:_react2.default.PropTypes.func,value:_react2.default.PropTypes.string},UICheckbox.defaultProps={checked:!1,indeterminate:!1,inputProps:{},labelProps:{},onChecked:_noop2.default,onUnchecked:_noop2.default},exports.default=UICheckbox;