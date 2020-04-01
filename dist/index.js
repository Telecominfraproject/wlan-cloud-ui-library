!(function(e, n) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = n(
        require('react'),
        require('antd'),
        require('prop-types'),
        require('@ant-design/icons'),
        require('react-router-dom')
      ))
    : 'function' == typeof define && define.amd
    ? define('connectus-ui-lib', [
        'react',
        'antd',
        'prop-types',
        '@ant-design/icons',
        'react-router-dom',
      ], n)
    : 'object' == typeof exports
    ? (exports['connectus-ui-lib'] = n(
        require('react'),
        require('antd'),
        require('prop-types'),
        require('@ant-design/icons'),
        require('react-router-dom')
      ))
    : (e['connectus-ui-lib'] = n(
        e.React,
        e.antd,
        e['prop-types'],
        e['@ant-design/icons'],
        e['react-router-dom']
      ));
})(window, function(e, n, t, o, r) {
  return (function(e) {
    var n = {};
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
      }),
      (t.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (t.t = function(e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (
          (t.r(o),
          Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
          2 & n && 'string' != typeof e)
        )
          for (var r in e)
            t.d(
              o,
              r,
              function(n) {
                return e[n];
              }.bind(null, r)
            );
        return o;
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
      }),
      (t.p = '/dist/'),
      t((t.s = 13))
    );
  })([
    function(n, t) {
      n.exports = e;
    },
    function(e, t) {
      e.exports = n;
    },
    function(e, n) {
      e.exports = t;
    },
    function(e, n, t) {
      var o = t(8),
        r = t(11);
      'string' == typeof (r = r.__esModule ? r.default : r) && (r = [[e.i, r, '']]);
      var a = { insert: 'head', singleton: !1 },
        i = (o(r, a), r.locals ? r.locals : {});
      e.exports = i;
    },
    function(e, n) {
      e.exports = o;
    },
    function(e, n) {
      e.exports = r;
    },
    function(e, n, t) {
      var o = t(8),
        r = t(10);
      'string' == typeof (r = r.__esModule ? r.default : r) && (r = [[e.i, r, '']]);
      var a = { insert: 'head', singleton: !1 },
        i = (o(r, a), r.locals ? r.locals : {});
      e.exports = i;
    },
    function(e, n, t) {
      var o = t(8),
        r = t(12);
      'string' == typeof (r = r.__esModule ? r.default : r) && (r = [[e.i, r, '']]);
      var a = { insert: 'head', singleton: !1 },
        i = (o(r, a), r.locals ? r.locals : {});
      e.exports = i;
    },
    function(e, n, t) {
      'use strict';
      var o,
        r = function() {
          return (
            void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o
          );
        },
        a = (function() {
          var e = {};
          return function(n) {
            if (void 0 === e[n]) {
              var t = document.querySelector(n);
              if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement)
                try {
                  t = t.contentDocument.head;
                } catch (e) {
                  t = null;
                }
              e[n] = t;
            }
            return e[n];
          };
        })(),
        i = [];
      function l(e) {
        for (var n = -1, t = 0; t < i.length; t++)
          if (i[t].identifier === e) {
            n = t;
            break;
          }
        return n;
      }
      function c(e, n) {
        for (var t = {}, o = [], r = 0; r < e.length; r++) {
          var a = e[r],
            c = n.base ? a[0] + n.base : a[0],
            s = t[c] || 0,
            u = ''.concat(c, ' ').concat(s);
          t[c] = s + 1;
          var d = l(u),
            p = { css: a[1], media: a[2], sourceMap: a[3] };
          -1 !== d
            ? (i[d].references++, i[d].updater(p))
            : i.push({ identifier: u, updater: g(p, n), references: 1 }),
            o.push(u);
        }
        return o;
      }
      function s(e) {
        var n = document.createElement('style'),
          o = e.attributes || {};
        if (void 0 === o.nonce) {
          var r = t.nc;
          r && (o.nonce = r);
        }
        if (
          (Object.keys(o).forEach(function(e) {
            n.setAttribute(e, o[e]);
          }),
          'function' == typeof e.insert)
        )
          e.insert(n);
        else {
          var i = a(e.insert || 'head');
          if (!i)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          i.appendChild(n);
        }
        return n;
      }
      var u,
        d =
          ((u = []),
          function(e, n) {
            return (u[e] = n), u.filter(Boolean).join('\n');
          });
      function p(e, n, t, o) {
        var r = t ? '' : o.media ? '@media '.concat(o.media, ' {').concat(o.css, '}') : o.css;
        if (e.styleSheet) e.styleSheet.cssText = d(n, r);
        else {
          var a = document.createTextNode(r),
            i = e.childNodes;
          i[n] && e.removeChild(i[n]), i.length ? e.insertBefore(a, i[n]) : e.appendChild(a);
        }
      }
      function m(e, n, t) {
        var o = t.css,
          r = t.media,
          a = t.sourceMap;
        if (
          (r ? e.setAttribute('media', r) : e.removeAttribute('media'),
          a &&
            btoa &&
            (o += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
              btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
              ' */'
            )),
          e.styleSheet)
        )
          e.styleSheet.cssText = o;
        else {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
          e.appendChild(document.createTextNode(o));
        }
      }
      var f = null,
        _ = 0;
      function g(e, n) {
        var t, o, r;
        if (n.singleton) {
          var a = _++;
          (t = f || (f = s(n))), (o = p.bind(null, t, a, !1)), (r = p.bind(null, t, a, !0));
        } else
          (t = s(n)),
            (o = m.bind(null, t, n)),
            (r = function() {
              !(function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
              })(t);
            });
        return (
          o(e),
          function(n) {
            if (n) {
              if (n.css === e.css && n.media === e.media && n.sourceMap === e.sourceMap) return;
              o((e = n));
            } else r();
          }
        );
      }
      e.exports = function(e, n) {
        (n = n || {}).singleton || 'boolean' == typeof n.singleton || (n.singleton = r());
        var t = c((e = e || []), n);
        return function(e) {
          if (((e = e || []), '[object Array]' === Object.prototype.toString.call(e))) {
            for (var o = 0; o < t.length; o++) {
              var r = l(t[o]);
              i[r].references--;
            }
            for (var a = c(e, n), s = 0; s < t.length; s++) {
              var u = l(t[s]);
              0 === i[u].references && (i[u].updater(), i.splice(u, 1));
            }
            t = a;
          }
        };
      };
    },
    function(e, n, t) {
      'use strict';
      e.exports = function(e) {
        var n = [];
        return (
          (n.toString = function() {
            return this.map(function(n) {
              var t = (function(e, n) {
                var t = e[1] || '',
                  o = e[3];
                if (!o) return t;
                if (n && 'function' == typeof btoa) {
                  var r =
                      ((i = o),
                      (l = btoa(unescape(encodeURIComponent(JSON.stringify(i))))),
                      (c = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                        l
                      )),
                      '/*# '.concat(c, ' */')),
                    a = o.sources.map(function(e) {
                      return '/*# sourceURL='.concat(o.sourceRoot || '').concat(e, ' */');
                    });
                  return [t]
                    .concat(a)
                    .concat([r])
                    .join('\n');
                }
                var i, l, c;
                return [t].join('\n');
              })(n, e);
              return n[2] ? '@media '.concat(n[2], ' {').concat(t, '}') : t;
            }).join('');
          }),
          (n.i = function(e, t, o) {
            'string' == typeof e && (e = [[null, e, '']]);
            var r = {};
            if (o)
              for (var a = 0; a < this.length; a++) {
                var i = this[a][0];
                null != i && (r[i] = !0);
              }
            for (var l = 0; l < e.length; l++) {
              var c = [].concat(e[l]);
              (o && r[c[0]]) ||
                (t && (c[2] ? (c[2] = ''.concat(t, ' and ').concat(c[2])) : (c[2] = t)), n.push(c));
            }
          }),
          n
        );
      };
    },
    function(e, n, t) {
      (n = t(9)(!0)).push([
        e.i,
        '.GlobalHeader-module__GlobalHeader___3DdAt{height:64px;left:234px;padding:0;position:fixed;display:flex;right:0;z-index:2000}.GlobalHeader-module__GlobalHeader___3DdAt.GlobalHeader-module__collapsed___1eu85{left:80px}.GlobalHeader-module__GlobalHeader___3DdAt.GlobalHeader-module__mobile___3ifCy{left:0}.GlobalHeader-module__GlobalHeader___3DdAt .ant-row{margin-bottom:10px}.GlobalHeader-module__GlobalHeader___3DdAt .ant-row:last-child{margin-bottom:0px}.GlobalHeader-module__LogoContainer___vVDpT{height:100%;display:flex;justify-content:center;align-items:center;padding:0 0 0 24px}.GlobalHeader-module__LogoContainer___vVDpT img{border-radius:5px}.GlobalHeader-module__MenuIcon___Q-cWA{cursor:pointer;font-size:18px;line-height:64px;padding:0 24px}.GlobalHeader-module__RightMenu___ciIt8{margin-left:auto}\n',
        '',
        {
          version: 3,
          sources: [
            '/Users/seanmacfarlane/connectus-wlan-ui-workspace/src/components/GlobalHeader/GlobalHeader.module.scss',
            '/Users/seanmacfarlane/connectus-wlan-ui-workspace/src/styles/variables.scss',
          ],
          names: [],
          mappings:
            'AAEA,2CACE,WCAkB,CDClB,UCJmB,CDKnB,SAAU,CACV,cAAe,CACf,YAAa,CACb,OAAQ,CACR,YAAa,CAPf,kFAUI,SCX0B,CDC9B,+EAaI,MAAO,CAbX,oDAiBI,kBAAmB,CAjBvB,+DAoBM,iBAAkB,CACnB,4CAKH,WAAY,CACZ,YAAa,CACb,sBAAuB,CACvB,kBAAmB,CACnB,kBAAmB,CALrB,gDAQI,iBAAkB,CACnB,uCAID,cAAe,CACf,cAAe,CACf,gBAAiB,CACjB,cAAe,CAChB,wCAGC,gBAAiB',
          file: 'GlobalHeader.module.scss',
          sourcesContent: [
            "@import 'styles/variables';\n\n.GlobalHeader {\n  height: $header-height;\n  left: $sidebar-width;\n  padding: 0;\n  position: fixed;\n  display: flex;\n  right: 0;\n  z-index: 2000;\n\n  &.collapsed {\n    left: $sidebar-collapsed-width;\n  }\n  &.mobile {\n    left: 0;\n  }\n\n  :global(.ant-row) {\n    margin-bottom: 10px;\n\n    &:last-child {\n      margin-bottom: 0px;\n    }\n  }\n}\n\n.LogoContainer {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0 0 0 24px;\n\n  img {\n    border-radius: 5px;\n  }\n}\n\n.MenuIcon {\n  cursor: pointer;\n  font-size: 18px;\n  line-height: 64px;\n  padding: 0 24px;\n}\n\n.RightMenu {\n  margin-left: auto;\n}",
            '$sidebar-width: 234px;\n$sidebar-collapsed-width: 80px;\n\n$header-height: 64px;',
          ],
        },
      ]),
        (n.locals = {
          GlobalHeader: 'GlobalHeader-module__GlobalHeader___3DdAt',
          collapsed: 'GlobalHeader-module__collapsed___1eu85',
          mobile: 'GlobalHeader-module__mobile___3ifCy',
          LogoContainer: 'GlobalHeader-module__LogoContainer___vVDpT',
          MenuIcon: 'GlobalHeader-module__MenuIcon___Q-cWA',
          RightMenu: 'GlobalHeader-module__RightMenu___ciIt8',
        }),
        (e.exports = n);
    },
    function(e, n, t) {
      (n = t(9)(!0)).push([
        e.i,
        '.Sider-module__Sider___2HIFH{height:100vh;left:0;position:fixed}.Sider-module__Sider___2HIFH.Sider-module__Mobile___1CS61{position:relative}.Sider-module__Sider___2HIFH.Sider-module__collapsed___3N3dW .Sider-module__Logo___OoUqJ{width:32px}.Sider-module__Sider___2HIFH .Sider-module__TopArea___36FBf{height:64px}.Sider-module__Sider___2HIFH .Sider-module__LogoContainer___MjsOi{height:100%;display:flex;justify-content:center;align-items:center}.Sider-module__Sider___2HIFH .Sider-module__Logo___OoUqJ{width:200px;border-radius:5px}.Sider-module__Sider___2HIFH .Sider-module__MenuIcon___3iNN4{margin-right:10px !important}\n',
        '',
        {
          version: 3,
          sources: [
            '/Users/seanmacfarlane/connectus-wlan-ui-workspace/src/components/SideMenu/Sider.module.scss',
            '/Users/seanmacfarlane/connectus-wlan-ui-workspace/src/styles/variables.scss',
          ],
          names: [],
          mappings:
            'AAEA,6BACE,YAAa,CACb,MAAO,CACP,cAAe,CAHjB,0DAMI,iBAAkB,CANtB,yFAWM,UAAW,CAXjB,4DAgBI,WCfgB,CDDpB,kEAoBI,WAAY,CACZ,YAAa,CACb,sBAAuB,CACvB,kBAAmB,CAvBvB,yDA2BI,WAAY,CACZ,iBAAkB,CA5BtB,6DAgCI,4BAA4B',
          file: 'Sider.module.scss',
          sourcesContent: [
            "@import 'styles/variables';\n\n.Sider {\n  height: 100vh;\n  left: 0;\n  position: fixed;\n\n  &.Mobile {\n    position: relative;\n  }\n\n  &.collapsed {\n    .Logo {\n      width: 32px;\n    }\n  }\n\n  .TopArea {\n    height: $header-height;\n  }\n\n  .LogoContainer {\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .Logo {\n    width: 200px;\n    border-radius: 5px;\n  }\n\n  .MenuIcon {\n    margin-right: 10px!important;\n  }\n}\n",
            '$sidebar-width: 234px;\n$sidebar-collapsed-width: 80px;\n\n$header-height: 64px;',
          ],
        },
      ]),
        (n.locals = {
          Sider: 'Sider-module__Sider___2HIFH',
          Mobile: 'Sider-module__Mobile___1CS61',
          collapsed: 'Sider-module__collapsed___3N3dW',
          Logo: 'Sider-module__Logo___OoUqJ',
          TopArea: 'Sider-module__TopArea___36FBf',
          LogoContainer: 'Sider-module__LogoContainer___MjsOi',
          MenuIcon: 'Sider-module__MenuIcon___3iNN4',
        }),
        (e.exports = n);
    },
    function(e, n, t) {
      (n = t(9)(!0)).push([
        e.i,
        '.AppLayout-module__MainLayout___2yplr{height:100vh;margin-left:234px;overflow:auto}.AppLayout-module__MainLayout___2yplr.AppLayout-module__collapsed___TkeP0{margin-left:80px}.AppLayout-module__MainLayout___2yplr.AppLayout-module__mobile___U70sC{margin-left:0}.AppLayout-module__Content___3rjzk{margin-top:64px}.AppLayout-module__Footer___3eiUm{text-align:center}\n',
        '',
        {
          version: 3,
          sources: [
            '/Users/seanmacfarlane/connectus-wlan-ui-workspace/src/containers/AppLayout/AppLayout.module.scss',
            '/Users/seanmacfarlane/connectus-wlan-ui-workspace/src/styles/variables.scss',
          ],
          names: [],
          mappings:
            'AAEA,sCACE,YAAa,CACb,iBCJmB,CDKnB,aAAc,CAHhB,0EAMI,gBCP0B,CDC9B,uEASI,aAAc,CACf,mCAID,eCbkB,CDcnB,kCAGC,iBAAkB',
          file: 'AppLayout.module.scss',
          sourcesContent: [
            "@import 'styles/variables';\n\n.MainLayout {\n  height: 100vh;\n  margin-left: $sidebar-width;\n  overflow: auto;\n\n  &.collapsed {\n    margin-left: $sidebar-collapsed-width;\n  }\n  &.mobile {\n    margin-left: 0;\n  }\n}\n\n.Content {\n  margin-top: $header-height;\n}\n\n.Footer {\n  text-align: center;\n}\n",
            '$sidebar-width: 234px;\n$sidebar-collapsed-width: 80px;\n\n$header-height: 64px;',
          ],
        },
      ]),
        (n.locals = {
          MainLayout: 'AppLayout-module__MainLayout___2yplr',
          collapsed: 'AppLayout-module__collapsed___TkeP0',
          mobile: 'AppLayout-module__mobile___U70sC',
          Content: 'AppLayout-module__Content___3rjzk',
          Footer: 'AppLayout-module__Footer___3eiUm',
        }),
        (e.exports = n);
    },
    function(e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, 'AppLayout', function() {
          return j;
        }),
        t.d(n, 'Dashboard', function() {
          return H;
        }),
        t.d(n, 'Login', function() {
          return N;
        }),
        t.d(n, 'GlobalHeader', function() {
          return _;
        }),
        t.d(n, 'RouteWithLayout', function() {
          return T;
        }),
        t.d(n, 'SideMenu', function() {
          return E;
        });
      var o = t(0),
        r = t.n(o),
        a = t(2),
        i = t.n(a),
        l = t(1),
        c = t(5),
        s = t(4),
        u = t(6),
        d = t.n(u);
      function p(e, n) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, n) {
            if (
              !(Symbol.iterator in Object(e)) &&
              '[object Arguments]' !== Object.prototype.toString.call(e)
            )
              return;
            var t = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (
                var i, l = e[Symbol.iterator]();
                !(o = (i = l.next()).done) && (t.push(i.value), !n || t.length !== n);
                o = !0
              );
            } catch (e) {
              (r = !0), (a = e);
            } finally {
              try {
                o || null == l.return || l.return();
              } finally {
                if (r) throw a;
              }
            }
            return t;
          })(e, n) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      var m = l.Layout.Header,
        f = function(e) {
          var n = e.collapsed,
            t = e.onMenuButtonClick,
            a = e.isMobile,
            i = e.logoMobile,
            u = p(Object(o.useState)(!1), 2),
            f = u[0],
            _ = u[1],
            g = function() {
              _(!1);
            },
            b = r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(
                l.Row,
                null,
                r.a.createElement(c.Link, { onClick: g, to: '/accounts/customers/view' }, 'Profile')
              ),
              r.a.createElement(
                l.Row,
                null,
                r.a.createElement(c.Link, { onClick: g, to: '/account' }, 'Users')
              ),
              r.a.createElement(
                l.Row,
                null,
                r.a.createElement(c.Link, { onClick: g, to: '/accounts' }, 'Advanced')
              ),
              r.a.createElement(
                l.Row,
                null,
                r.a.createElement(
                  c.Link,
                  { onClick: g, to: '/accounts/customersxw' },
                  'Rules Preference'
                )
              )
            );
          return r.a.createElement(
            m,
            {
              className: ''
                .concat(d.a.GlobalHeader, ' ')
                .concat(n ? d.a.collapsed : '', ' ')
                .concat(a ? d.a.mobile : ''),
            },
            a && [
              r.a.createElement(
                c.Link,
                { className: d.a.LogoContainer, to: '/', key: 'mobileLogo' },
                r.a.createElement('img', { src: i, alt: 'logo', width: '32' })
              ),
            ],
            n
              ? r.a.createElement(s.MenuUnfoldOutlined, { className: d.a.MenuIcon, onClick: t })
              : r.a.createElement(s.MenuFoldOutlined, { className: d.a.MenuIcon, onClick: t }),
            r.a.createElement(
              'div',
              { className: d.a.RightMenu },
              r.a.createElement(
                l.Popover,
                {
                  content: b,
                  trigger: 'click',
                  getPopupContainer: function(e) {
                    return e.parentElement;
                  },
                  visible: f,
                  onVisibleChange: function(e) {
                    _(e);
                  },
                  placement: 'bottomRight',
                  arrowPointAtCenter: !0,
                },
                r.a.createElement(s.SettingOutlined, { className: d.a.MenuIcon })
              )
            )
          );
        };
      f.propTypes = {
        collapsed: i.a.bool.isRequired,
        onMenuButtonClick: i.a.func.isRequired,
        isMobile: i.a.bool.isRequired,
        logoMobile: i.a.string.isRequired,
      };
      var _ = f,
        g = t(3),
        b = t.n(g);
      function h() {
        return (h =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      function y(e) {
        return (
          (function(e) {
            if (Array.isArray(e)) {
              for (var n = 0, t = new Array(e.length); n < e.length; n++) t[n] = e[n];
              return t;
            }
          })(e) ||
          (function(e) {
            if (
              Symbol.iterator in Object(e) ||
              '[object Arguments]' === Object.prototype.toString.call(e)
            )
              return Array.from(e);
          })(e) ||
          (function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
          })()
        );
      }
      function A(e, n) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, n) {
            if (
              !(Symbol.iterator in Object(e)) &&
              '[object Arguments]' !== Object.prototype.toString.call(e)
            )
              return;
            var t = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (
                var i, l = e[Symbol.iterator]();
                !(o = (i = l.next()).done) && (t.push(i.value), !n || t.length !== n);
                o = !0
              );
            } catch (e) {
              (r = !0), (a = e);
            } finally {
              try {
                o || null == l.return || l.return();
              } finally {
                if (r) throw a;
              }
            }
            return t;
          })(e, n) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      var C = l.Layout.Sider,
        v = l.Menu.SubMenu,
        x = l.Menu.Item,
        w = ['accounts', 'network', 'configuration', 'insights', 'system', 'history'],
        M = function(e) {
          var n = e.locationState,
            t = e.collapsed,
            a = e.isMobile,
            i = e.logo,
            u = e.logoMobile,
            d = e.onMenuButtonClick,
            p = e.onMenuItemClick,
            m = e.onLogout,
            f = A(Object(o.useState)([]), 2),
            _ = f[0],
            g = f[1];
          Object(o.useEffect)(
            function() {
              g([]);
            },
            [t]
          );
          var M = (function e() {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { items: [] },
                o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                a = [],
                i = [],
                l = y(o);
              return (
                t.items.forEach(function(o) {
                  if (o && o.key)
                    if (o.children) {
                      var s = e({ items: o.children, parent: o });
                      s.selectedKeys &&
                        s.selectedKeys.length &&
                        (l = [].concat(y(l), y(s.selectedKeys))),
                        s.openKeys && s.openKeys.length && (i = [].concat(y(i), y(s.openKeys))),
                        a.push(
                          r.a.createElement(
                            v,
                            {
                              key: o.key,
                              title: r.a.createElement(
                                'span',
                                null,
                                o.icon,
                                r.a.createElement('span', null, o.text)
                              ),
                            },
                            s.items
                          )
                        );
                    } else {
                      var u = o.Component || x,
                        d = function(e) {
                          var n = h({}, e);
                          return r.a.createElement(c.Link, n);
                        };
                      o.LinkComponent && (d = o.LinkComponent);
                      var p = n.pathname,
                        m = ''.concat(p).concat(n.hash);
                      (p.startsWith(o.path) || m.startsWith(o.path)) &&
                        (t.parent && i.push(t.parent.key), l.push(o.key.toString())),
                        a.push(
                          r.a.createElement(
                            u,
                            { key: o.key, className: 'ant-menu-item' },
                            r.a.createElement(
                              d,
                              { onClick: o.onClick, to: o.path },
                              o.icon,
                              r.a.createElement('span', null, o.text)
                            )
                          )
                        );
                    }
                }),
                { items: a, selectedKeys: l, keys: i }
              );
            })({
              items: [
                {
                  key: 'dashboard',
                  icon: r.a.createElement(s.DashboardOutlined, { className: b.a.MenuIcon }),
                  path: '/',
                  text: 'Dashboard',
                  onClick: p,
                },
                {
                  key: 'profiles',
                  icon: r.a.createElement(s.ProfileOutlined, { className: b.a.MenuIcon }),
                  path: '/profiles',
                  text: 'Profiles',
                  onClick: p,
                },
                {
                  key: 'reports',
                  icon: r.a.createElement(s.AreaChartOutlined, { className: b.a.MenuIcon }),
                  path: '/analytics/qoe',
                  text: 'Insights',
                  onClick: p,
                },
                {
                  key: 'client-devices',
                  icon: r.a.createElement(s.MobileOutlined, { className: b.a.MenuIcon }),
                  path: '/network/client-devices',
                  text: 'Client Devices',
                  onClick: p,
                },
                {
                  key: 'network-elements',
                  icon: r.a.createElement(s.ApiOutlined, { className: b.a.MenuIcon }),
                  path: '/network/elements',
                  text: 'Network Elements',
                  onClick: p,
                },
                {
                  key: 'alarms',
                  icon: r.a.createElement(s.NotificationOutlined, { className: b.a.MenuIcon }),
                  path: '/network/alarms',
                  text: 'Alarms',
                  onClick: p,
                },
                {
                  key: 'settings',
                  icon: r.a.createElement(s.SettingOutlined, { className: b.a.MenuIcon }),
                  path: '/settings',
                  text: 'Settings',
                  onClick: p,
                },
                {
                  key: 'logout',
                  icon: r.a.createElement(s.LogoutOutlined, { className: b.a.MenuIcon }),
                  path: '/signout',
                  text: 'Sign Out',
                  onClick: m,
                },
              ],
            }),
            E = r.a.createElement(
              C,
              {
                collapsed: !a && t,
                width: '234px',
                collapsedWidth: '80px',
                breakpoint: 'lg',
                className: ''
                  .concat(b.a.Sider, ' ')
                  .concat(t ? b.a.collapsed : '', '  ')
                  .concat(a ? b.a.Mobile : ''),
              },
              r.a.createElement(
                'div',
                { className: b.a.TopArea },
                r.a.createElement(
                  c.Link,
                  { className: b.a.LogoContainer, to: '/' },
                  r.a.createElement('img', { className: b.a.Logo, alt: 'logo', src: t ? u : i })
                )
              ),
              r.a.createElement(
                l.Menu,
                {
                  className: 'sidemenu',
                  selectedKeys: M.selectedKeys,
                  defaultOpenKeys: M.openKeys,
                  onOpenChange: function(e) {
                    var n = e.find(function(e) {
                      return !_.includes(e);
                    });
                    -1 === w.indexOf(n) ? g(e) : g(n ? [n] : []);
                  },
                  mode: 'inline',
                  theme: 'dark',
                },
                M.items
              )
            );
          return a
            ? r.a.createElement(
                l.Drawer,
                {
                  zIndex: 9999,
                  placement: 'left',
                  closable: !1,
                  visible: !t,
                  onClose: d,
                  bodyStyle: { padding: 0 },
                  width: 256,
                },
                E
              )
            : E;
        };
      M.propTypes = {
        locationState: i.a.instanceOf(Object).isRequired,
        collapsed: i.a.bool.isRequired,
        isMobile: i.a.bool.isRequired,
        logo: i.a.string.isRequired,
        logoMobile: i.a.string.isRequired,
        onMenuButtonClick: i.a.func.isRequired,
        onMenuItemClick: i.a.func.isRequired,
        onLogout: i.a.func.isRequired,
      };
      var E = M,
        k = t(7),
        S = t.n(k);
      function B(e, n) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function(e, n) {
            if (
              !(Symbol.iterator in Object(e)) &&
              '[object Arguments]' !== Object.prototype.toString.call(e)
            )
              return;
            var t = [],
              o = !0,
              r = !1,
              a = void 0;
            try {
              for (
                var i, l = e[Symbol.iterator]();
                !(o = (i = l.next()).done) && (t.push(i.value), !n || t.length !== n);
                o = !0
              );
            } catch (e) {
              (r = !0), (a = e);
            } finally {
              try {
                o || null == l.return || l.return();
              } finally {
                if (r) throw a;
              }
            }
            return t;
          })(e, n) ||
          (function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
          })()
        );
      }
      var L = l.Layout.Content,
        O = l.Layout.Footer,
        I = function(e) {
          var n = e.children,
            t = e.company,
            a = e.logo,
            i = e.logoMobile,
            c = e.locationState,
            s = e.onLogout,
            u = B(Object(o.useState)(!1), 2),
            d = u[0],
            p = u[1],
            m = B(Object(o.useState)(!1), 2),
            f = m[0],
            g = m[1],
            b = B(Object(o.useState)('lg'), 2),
            h = b[0],
            y = b[1],
            A = new Date().getFullYear(),
            C = function() {
              var e = window.innerWidth;
              e < 768 && 'sm' !== h
                ? (p(!0), g(!0), y('sm'))
                : e >= 768 && e < 992 && 'md' !== h
                ? (p(!0), g(!1), y('md'))
                : e >= 992 && 'lg' !== h && (p(!1), g(!1), y('lg'));
            },
            v = function() {
              p(!d);
            };
          return (
            Object(o.useEffect)(function() {
              return (
                C(),
                window.addEventListener('resize', C),
                function() {
                  return window.removeEventListener('resize', C);
                }
              );
            }, []),
            Object(o.useEffect)(
              function() {
                return (
                  window.addEventListener('resize', C),
                  function() {
                    return window.removeEventListener('resize', C);
                  }
                );
              },
              [h]
            ),
            r.a.createElement(
              l.Layout,
              null,
              r.a.createElement(E, {
                locationState: c,
                collapsed: d,
                isMobile: f,
                logo: a,
                logoMobile: i,
                onMenuButtonClick: v,
                onMenuItemClick: function() {
                  !0 === f && p(!0);
                },
                onLogout: function() {
                  s();
                },
              }),
              r.a.createElement(
                l.Layout,
                {
                  className: ''
                    .concat(S.a.MainLayout, ' ')
                    .concat(d ? S.a.collapsed : '', ' ')
                    .concat(f ? S.a.mobile : ''),
                },
                r.a.createElement(_, {
                  collapsed: d,
                  isMobile: f,
                  logoMobile: i,
                  onMenuButtonClick: v,
                }),
                r.a.createElement(L, { className: S.a.Content }, n),
                r.a.createElement(
                  O,
                  { className: S.a.Footer },
                  'Copyright © ',
                  A,
                  ' ',
                  t,
                  ' Inc. All Rights Reserved.'
                )
              )
            )
          );
        };
      I.propTypes = {
        children: i.a.node.isRequired,
        company: i.a.string.isRequired,
        logo: i.a.string.isRequired,
        logoMobile: i.a.string.isRequired,
        onLogout: i.a.func.isRequired,
        locationState: i.a.instanceOf(Object).isRequired,
      };
      var j = I,
        H = function() {
          return r.a.createElement('h1', null, 'Dashboard');
        },
        R = l.Form.Item,
        N = function() {
          return r.a.createElement(
            l.Card,
            null,
            r.a.createElement('h1', null, 'Test In'),
            r.a.createElement(
              l.Form,
              { name: 'login' },
              r.a.createElement(
                R,
                {
                  label: 'E-mail',
                  name: 'email',
                  rules: [{ required: !0, message: 'Please input your e-mail!' }],
                },
                r.a.createElement(l.Input, null)
              ),
              r.a.createElement(
                R,
                {
                  label: 'Password',
                  name: 'password',
                  rules: [{ required: !0, message: 'Please input your password!' }],
                },
                r.a.createElement(l.Input.Password, null)
              ),
              r.a.createElement(
                R,
                null,
                r.a.createElement(l.Button, { type: 'primary', htmlType: 'submit' }, 'Log In')
              )
            )
          );
        };
      function q() {
        return (q =
          Object.assign ||
          function(e) {
            for (var n = 1; n < arguments.length; n++) {
              var t = arguments[n];
              for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }).apply(this, arguments);
      }
      function D(e, n) {
        if (null == e) return {};
        var t,
          o,
          r = (function(e, n) {
            if (null == e) return {};
            var t,
              o,
              r = {},
              a = Object.keys(e);
            for (o = 0; o < a.length; o++) (t = a[o]), n.indexOf(t) >= 0 || (r[t] = e[t]);
            return r;
          })(e, n);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (o = 0; o < a.length; o++)
            (t = a[o]),
              n.indexOf(t) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, t) && (r[t] = e[t]));
        }
        return r;
      }
      var G = function(e) {
        var n = e.component,
          t = D(e, ['component']);
        return r.a.createElement(
          c.Route,
          q({}, t, {
            render: function(e) {
              return r.a.createElement(j, null, r.a.createElement(n, e));
            },
          })
        );
      };
      G.propTypes = { component: i.a.func.isRequired };
      var T = G;
    },
  ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nvbm5lY3R1cy11aS1saWIvZXh0ZXJuYWwge1wiYW1kXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliL2V4dGVybmFsIFwiYW50ZFwiIiwid2VicGFjazovL2Nvbm5lY3R1cy11aS1saWIvZXh0ZXJuYWwgXCJwcm9wLXR5cGVzXCIiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi8uL3NyYy9jb21wb25lbnRzL1NpZGVNZW51L1NpZGVyLm1vZHVsZS5zY3NzP2U0ZTQiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi9leHRlcm5hbCBcIkBhbnQtZGVzaWduL2ljb25zXCIiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vc3JjL2NvbXBvbmVudHMvR2xvYmFsSGVhZGVyL0dsb2JhbEhlYWRlci5tb2R1bGUuc2Nzcz81NmJiIiwid2VicGFjazovL2Nvbm5lY3R1cy11aS1saWIvLi9zcmMvY29udGFpbmVycy9BcHBMYXlvdXQvQXBwTGF5b3V0Lm1vZHVsZS5zY3NzP2RjZmQiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vc3JjL2NvbXBvbmVudHMvR2xvYmFsSGVhZGVyL0dsb2JhbEhlYWRlci5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vc3JjL2NvbXBvbmVudHMvU2lkZU1lbnUvU2lkZXIubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi8uL3NyYy9jb250YWluZXJzL0FwcExheW91dC9BcHBMYXlvdXQubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi8uL3NyYy9jb21wb25lbnRzL0dsb2JhbEhlYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vc3JjL2NvbXBvbmVudHMvU2lkZU1lbnUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29ubmVjdHVzLXVpLWxpYi8uL3NyYy9jb250YWluZXJzL0FwcExheW91dC9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vc3JjL2NvbnRhaW5lcnMvRGFzaGJvYXJkL2luZGV4LmpzIiwid2VicGFjazovL2Nvbm5lY3R1cy11aS1saWIvLi9zcmMvY29udGFpbmVycy9Mb2dpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jb25uZWN0dXMtdWktbGliLy4vc3JjL2NvbXBvbmVudHMvUm91dGVXaXRoTGF5b3V0L2luZGV4LmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsInJlcXVpcmUiLCJkZWZpbmUiLCJhbWQiLCJ3aW5kb3ciLCJfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18wX18iLCJfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xX18iLCJfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18yX18iLCJfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18iLCJfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX181X18iLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiYXBpIiwiY29udGVudCIsImRlZmF1bHQiLCJvcHRpb25zIiwiZXhwb3J0ZWQiLCJsb2NhbHMiLCJtZW1vIiwiaXNPbGRJRSIsIkJvb2xlYW4iLCJkb2N1bWVudCIsImFsbCIsImF0b2IiLCJnZXRUYXJnZXQiLCJ0YXJnZXQiLCJzdHlsZVRhcmdldCIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MSUZyYW1lRWxlbWVudCIsImNvbnRlbnREb2N1bWVudCIsImhlYWQiLCJlIiwic3R5bGVzSW5Eb20iLCJnZXRJbmRleEJ5SWRlbnRpZmllciIsImlkZW50aWZpZXIiLCJyZXN1bHQiLCJsZW5ndGgiLCJtb2R1bGVzVG9Eb20iLCJsaXN0IiwiaWRDb3VudE1hcCIsImlkZW50aWZpZXJzIiwiaXRlbSIsImlkIiwiYmFzZSIsImNvdW50IiwiY29uY2F0IiwiaW5kZXgiLCJvYmoiLCJjc3MiLCJtZWRpYSIsInNvdXJjZU1hcCIsInJlZmVyZW5jZXMiLCJ1cGRhdGVyIiwicHVzaCIsImFkZFN0eWxlIiwiaW5zZXJ0U3R5bGVFbGVtZW50Iiwic3R5bGUiLCJjcmVhdGVFbGVtZW50IiwiYXR0cmlidXRlcyIsIm5vbmNlIiwia2V5cyIsImZvckVhY2giLCJzZXRBdHRyaWJ1dGUiLCJpbnNlcnQiLCJFcnJvciIsImFwcGVuZENoaWxkIiwidGV4dFN0b3JlIiwicmVwbGFjZVRleHQiLCJyZXBsYWNlbWVudCIsImZpbHRlciIsImpvaW4iLCJhcHBseVRvU2luZ2xldG9uVGFnIiwicmVtb3ZlIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJjc3NOb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJjaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJhcHBseVRvVGFnIiwicmVtb3ZlQXR0cmlidXRlIiwiYnRvYSIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImZpcnN0Q2hpbGQiLCJzaW5nbGV0b24iLCJzaW5nbGV0b25Db3VudGVyIiwidXBkYXRlIiwic3R5bGVJbmRleCIsInBhcmVudE5vZGUiLCJyZW1vdmVTdHlsZUVsZW1lbnQiLCJuZXdPYmoiLCJsYXN0SWRlbnRpZmllcnMiLCJuZXdMaXN0IiwidG9TdHJpbmciLCJuZXdMYXN0SWRlbnRpZmllcnMiLCJfaSIsIl9pbmRleCIsInNwbGljZSIsInVzZVNvdXJjZU1hcCIsInRoaXMiLCJtYXAiLCJjc3NNYXBwaW5nIiwic291cmNlTWFwcGluZyIsImJhc2U2NCIsImRhdGEiLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZSIsInNvdXJjZVJvb3QiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibWVkaWFRdWVyeSIsImRlZHVwZSIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18iLCJIZWFkZXIiLCJMYXlvdXQiLCJHbG9iYWxIZWFkZXIiLCJjb2xsYXBzZWQiLCJvbk1lbnVCdXR0b25DbGljayIsImlzTW9iaWxlIiwibG9nb01vYmlsZSIsInVzZVN0YXRlIiwicG9wb3ZlclZpc2libGUiLCJzZXRQb3BvdmVyVmlzaWJsZSIsImhpZGVQb3BvdmVyIiwidXNlck9wdGlvbnMiLCJvbkNsaWNrIiwidG8iLCJjbGFzc05hbWUiLCJzdHlsZXMiLCJtb2JpbGUiLCJMb2dvQ29udGFpbmVyIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJNZW51SWNvbiIsIlJpZ2h0TWVudSIsInRyaWdnZXIiLCJnZXRQb3B1cENvbnRhaW5lciIsInBhcmVudEVsZW1lbnQiLCJ2aXNpYmxlIiwib25WaXNpYmxlQ2hhbmdlIiwicGxhY2VtZW50IiwiYXJyb3dQb2ludEF0Q2VudGVyIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJmdW5jIiwic3RyaW5nIiwiU2lkZXIiLCJTdWJNZW51IiwiTWVudSIsIkl0ZW0iLCJyb290U3VibWVudUtleXMiLCJTaWRlTWVudSIsImxvY2F0aW9uU3RhdGUiLCJsb2dvIiwib25NZW51SXRlbUNsaWNrIiwib25Mb2dvdXQiLCJvcGVuS2V5cyIsInNldE9wZW5LZXlzIiwidXNlRWZmZWN0IiwibWVudSIsImdldE1lbnUiLCJjb25maWciLCJpdGVtcyIsImRlZmF1bHRTZWxlY3RlZEtleXMiLCJzZWxlY3RlZEtleXMiLCJjaGlsZHJlbiIsInN1Yk1lbnUiLCJwYXJlbnQiLCJ0aXRsZSIsImljb24iLCJ0ZXh0IiwiSXRlbUNvbXBvbmVudCIsIkNvbXBvbmVudCIsIkxpbmtDb21wb25lbnQiLCJyZXN0UCIsInBhdGgiLCJwYXRobmFtZSIsInBhdGhBbmRIYXNoIiwiaGFzaCIsInN0YXJ0c1dpdGgiLCJzaWRlciIsImNvbGxhcHNlZFdpZHRoIiwiYnJlYWtwb2ludCIsIk1vYmlsZSIsIlRvcEFyZWEiLCJMb2dvIiwiZGVmYXVsdE9wZW5LZXlzIiwib25PcGVuQ2hhbmdlIiwibGF0ZXN0T3BlbktleSIsImZpbmQiLCJpbmNsdWRlcyIsImluZGV4T2YiLCJ0aGVtZSIsInpJbmRleCIsImNsb3NhYmxlIiwib25DbG9zZSIsImJvZHlTdHlsZSIsInBhZGRpbmciLCJpbnN0YW5jZU9mIiwiQ29udGVudCIsIkZvb3RlciIsIkFwcExheW91dCIsImNvbXBhbnkiLCJpc0NvbGxhcHNlZCIsInNldElzQ29sbGFwc2VkIiwic2V0SXNNb2JpbGUiLCJzY3JlZW5TaXplIiwic2V0U2NyZWVuU2l6ZSIsImN1cnJlbnRZZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwiaGFuZGxlUmVzaXplIiwiaW5uZXJXaWR0aCIsImhhbmRsZU1lbnVUb2dnbGUiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIk1haW5MYXlvdXQiLCJub2RlIiwiRGFzaGJvYXJkIiwiRm9ybSIsIkxvZ2luIiwibGFiZWwiLCJydWxlcyIsInJlcXVpcmVkIiwibWVzc2FnZSIsIlBhc3N3b3JkIiwidHlwZSIsImh0bWxUeXBlIiwiUm91dGVXaXRoTGF5b3V0IiwiY29tcG9uZW50IiwicmVzdCIsInJlbmRlciIsInByb3BzIiwiVCJdLCJtYXBwaW5ncyI6IkNBQUEsU0FBMkNBLEVBQU1DLEdBQzFCLGlCQUFaQyxTQUEwQyxpQkFBWEMsT0FDeENBLE9BQU9ELFFBQVVELEVBQVFHLFFBQVEsU0FBVUEsUUFBUSxRQUFTQSxRQUFRLGNBQWVBLFFBQVEscUJBQXNCQSxRQUFRLHFCQUNoRyxtQkFBWEMsUUFBeUJBLE9BQU9DLElBQzlDRCxPQUFPLG1CQUFvQixDQUFDLFFBQVMsT0FBUSxhQUFjLG9CQUFxQixvQkFBcUJKLEdBQzNFLGlCQUFaQyxRQUNkQSxRQUFRLG9CQUFzQkQsRUFBUUcsUUFBUSxTQUFVQSxRQUFRLFFBQVNBLFFBQVEsY0FBZUEsUUFBUSxxQkFBc0JBLFFBQVEscUJBRXRJSixFQUFLLG9CQUFzQkMsRUFBUUQsRUFBWSxNQUFHQSxFQUFXLEtBQUdBLEVBQUssY0FBZUEsRUFBSyxxQkFBc0JBLEVBQUsscUJBUnRILENBU0dPLFFBQVEsU0FBU0MsRUFBZ0NDLEVBQWdDQyxFQUFnQ0MsRUFBZ0NDLEdBQ3BKLE8sWUNURSxJQUFJQyxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVYixRQUduQyxJQUFJQyxFQUFTVSxFQUFpQkUsR0FBWSxDQUN6Q0MsRUFBR0QsRUFDSEUsR0FBRyxFQUNIZixRQUFTLElBVVYsT0FOQWdCLEVBQVFILEdBQVVJLEtBQUtoQixFQUFPRCxRQUFTQyxFQUFRQSxFQUFP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RCxFQUFjNEQsU0FNdkJKLEVBQWdCeEYsVUFBWSxDQUMxQnlGLFVBQVdJLElBQUV6RixLQUFLRCxZQUdMcUYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcImFudGRcIiksIHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpLCByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIiksIHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiY29ubmVjdHVzLXVpLWxpYlwiLCBbXCJyZWFjdFwiLCBcImFudGRcIiwgXCJwcm9wLXR5cGVzXCIsIFwiQGFudC1kZXNpZ24vaWNvbnNcIiwgXCJyZWFjdC1yb3V0ZXItZG9tXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImNvbm5lY3R1cy11aS1saWJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcImFudGRcIiksIHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpLCByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIiksIHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjb25uZWN0dXMtdWktbGliXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJhbnRkXCJdLCByb290W1wicHJvcC10eXBlc1wiXSwgcm9vdFtcIkBhbnQtZGVzaWduL2ljb25zXCJdLCByb290W1wicmVhY3Qtcm91dGVyLWRvbVwiXSk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMl9fOyIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNy0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1NpZGVyLm1vZHVsZS5zY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG52YXIgZXhwb3J0ZWQgPSBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDoge307XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVkOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNV9fOyIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNy0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL0dsb2JhbEhlYWRlci5tb2R1bGUuc2Nzc1wiKTtcblxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgfVxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxudmFyIGV4cG9ydGVkID0gY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHt9O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlZDsiLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTctMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9BcHBMYXlvdXQubW9kdWxlLnNjc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cbnZhciBleHBvcnRlZCA9IGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB7fTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0ZWQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiBidG9hKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyh0cnVlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkdsb2JhbEhlYWRlci1tb2R1bGVfX0dsb2JhbEhlYWRlcl9fXzNEZEF0e2hlaWdodDo2NHB4O2xlZnQ6MjM0cHg7cGFkZGluZzowO3Bvc2l0aW9uOmZpeGVkO2Rpc3BsYXk6ZmxleDtyaWdodDowO3otaW5kZXg6MjAwMH0uR2xvYmFsSGVhZGVyLW1vZHVsZV9fR2xvYmFsSGVhZGVyX19fM0RkQXQuR2xvYmFsSGVhZGVyLW1vZHVsZV9fY29sbGFwc2VkX19fMWV1ODV7bGVmdDo4MHB4fS5HbG9iYWxIZWFkZXItbW9kdWxlX19HbG9iYWxIZWFkZXJfX18zRGRBdC5HbG9iYWxIZWFkZXItbW9kdWxlX19tb2JpbGVfX18zaWZDeXtsZWZ0OjB9Lkdsb2JhbEhlYWRlci1tb2R1bGVfX0dsb2JhbEhlYWRlcl9fXzNEZEF0IC5hbnQtcm93e21hcmdpbi1ib3R0b206MTBweH0uR2xvYmFsSGVhZGVyLW1vZHVsZV9fR2xvYmFsSGVhZGVyX19fM0RkQXQgLmFudC1yb3c6bGFzdC1jaGlsZHttYXJnaW4tYm90dG9tOjBweH0uR2xvYmFsSGVhZGVyLW1vZHVsZV9fTG9nb0NvbnRhaW5lcl9fX3ZWRHBUe2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwYWRkaW5nOjAgMCAwIDI0cHh9Lkdsb2JhbEhlYWRlci1tb2R1bGVfX0xvZ29Db250YWluZXJfX192VkRwVCBpbWd7Ym9yZGVyLXJhZGl1czo1cHh9Lkdsb2JhbEhlYWRlci1tb2R1bGVfX01lbnVJY29uX19fUS1jV0F7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOjE4cHg7bGluZS1oZWlnaHQ6NjRweDtwYWRkaW5nOjAgMjRweH0uR2xvYmFsSGVhZGVyLW1vZHVsZV9fUmlnaHRNZW51X19fY2lJdDh7bWFyZ2luLWxlZnQ6YXV0b31cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvVXNlcnMvc2Vhbm1hY2ZhcmxhbmUvY29ubmVjdHVzLXdsYW4tdWktd29ya3NwYWNlL3NyYy9jb21wb25lbnRzL0dsb2JhbEhlYWRlci9HbG9iYWxIZWFkZXIubW9kdWxlLnNjc3NcIixcIi9Vc2Vycy9zZWFubWFjZmFybGFuZS9jb25uZWN0dXMtd2xhbi11aS13b3Jrc3BhY2Uvc3JjL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQSwyQ0FDRSxXQ0FrQixDRENsQixVQ0ptQixDREtuQixTQUFVLENBQ1YsY0FBZSxDQUNmLFlBQWEsQ0FDYixPQUFRLENBQ1IsWUFBYSxDQVBmLGtGQVVJLFNDWDBCLENEQzlCLCtFQWFJLE1BQU8sQ0FiWCxvREFpQkksa0JBQW1CLENBakJ2QiwrREFvQk0saUJBQWtCLENBQ25CLDRDQUtILFdBQVksQ0FDWixZQUFhLENBQ2Isc0JBQXVCLENBQ3ZCLGtCQUFtQixDQUNuQixrQkFBbUIsQ0FMckIsZ0RBUUksaUJBQWtCLENBQ25CLHVDQUlELGNBQWUsQ0FDZixjQUFlLENBQ2YsZ0JBQWlCLENBQ2pCLGNBQWUsQ0FDaEIsd0NBR0MsZ0JBQWlCXCIsXCJmaWxlXCI6XCJHbG9iYWxIZWFkZXIubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAnc3R5bGVzL3ZhcmlhYmxlcyc7XFxuXFxuLkdsb2JhbEhlYWRlciB7XFxuICBoZWlnaHQ6ICRoZWFkZXItaGVpZ2h0O1xcbiAgbGVmdDogJHNpZGViYXItd2lkdGg7XFxuICBwYWRkaW5nOiAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHJpZ2h0OiAwO1xcbiAgei1pbmRleDogMjAwMDtcXG5cXG4gICYuY29sbGFwc2VkIHtcXG4gICAgbGVmdDogJHNpZGViYXItY29sbGFwc2VkLXdpZHRoO1xcbiAgfVxcbiAgJi5tb2JpbGUge1xcbiAgICBsZWZ0OiAwO1xcbiAgfVxcblxcbiAgOmdsb2JhbCguYW50LXJvdykge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcblxcbiAgICAmOmxhc3QtY2hpbGQge1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDBweDtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4uTG9nb0NvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMCAwIDAgMjRweDtcXG5cXG4gIGltZyB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIH1cXG59XFxuXFxuLk1lbnVJY29uIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGxpbmUtaGVpZ2h0OiA2NHB4O1xcbiAgcGFkZGluZzogMCAyNHB4O1xcbn1cXG5cXG4uUmlnaHRNZW51IHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbn1cIixcIiRzaWRlYmFyLXdpZHRoOiAyMzRweDtcXG4kc2lkZWJhci1jb2xsYXBzZWQtd2lkdGg6IDgwcHg7XFxuXFxuJGhlYWRlci1oZWlnaHQ6IDY0cHg7XCJdfV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiR2xvYmFsSGVhZGVyXCI6IFwiR2xvYmFsSGVhZGVyLW1vZHVsZV9fR2xvYmFsSGVhZGVyX19fM0RkQXRcIixcblx0XCJjb2xsYXBzZWRcIjogXCJHbG9iYWxIZWFkZXItbW9kdWxlX19jb2xsYXBzZWRfX18xZXU4NVwiLFxuXHRcIm1vYmlsZVwiOiBcIkdsb2JhbEhlYWRlci1tb2R1bGVfX21vYmlsZV9fXzNpZkN5XCIsXG5cdFwiTG9nb0NvbnRhaW5lclwiOiBcIkdsb2JhbEhlYWRlci1tb2R1bGVfX0xvZ29Db250YWluZXJfX192VkRwVFwiLFxuXHRcIk1lbnVJY29uXCI6IFwiR2xvYmFsSGVhZGVyLW1vZHVsZV9fTWVudUljb25fX19RLWNXQVwiLFxuXHRcIlJpZ2h0TWVudVwiOiBcIkdsb2JhbEhlYWRlci1tb2R1bGVfX1JpZ2h0TWVudV9fX2NpSXQ4XCJcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuU2lkZXItbW9kdWxlX19TaWRlcl9fXzJISUZIe2hlaWdodDoxMDB2aDtsZWZ0OjA7cG9zaXRpb246Zml4ZWR9LlNpZGVyLW1vZHVsZV9fU2lkZXJfX18ySElGSC5TaWRlci1tb2R1bGVfX01vYmlsZV9fXzFDUzYxe3Bvc2l0aW9uOnJlbGF0aXZlfS5TaWRlci1tb2R1bGVfX1NpZGVyX19fMkhJRkguU2lkZXItbW9kdWxlX19jb2xsYXBzZWRfX18zTjNkVyAuU2lkZXItbW9kdWxlX19Mb2dvX19fT29VcUp7d2lkdGg6MzJweH0uU2lkZXItbW9kdWxlX19TaWRlcl9fXzJISUZIIC5TaWRlci1tb2R1bGVfX1RvcEFyZWFfX18zNkZCZntoZWlnaHQ6NjRweH0uU2lkZXItbW9kdWxlX19TaWRlcl9fXzJISUZIIC5TaWRlci1tb2R1bGVfX0xvZ29Db250YWluZXJfX19NanNPaXtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LlNpZGVyLW1vZHVsZV9fU2lkZXJfX18ySElGSCAuU2lkZXItbW9kdWxlX19Mb2dvX19fT29VcUp7d2lkdGg6MjAwcHg7Ym9yZGVyLXJhZGl1czo1cHh9LlNpZGVyLW1vZHVsZV9fU2lkZXJfX18ySElGSCAuU2lkZXItbW9kdWxlX19NZW51SWNvbl9fXzNpTk40e21hcmdpbi1yaWdodDoxMHB4ICFpbXBvcnRhbnR9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL1VzZXJzL3NlYW5tYWNmYXJsYW5lL2Nvbm5lY3R1cy13bGFuLXVpLXdvcmtzcGFjZS9zcmMvY29tcG9uZW50cy9TaWRlTWVudS9TaWRlci5tb2R1bGUuc2Nzc1wiLFwiL1VzZXJzL3NlYW5tYWNmYXJsYW5lL2Nvbm5lY3R1cy13bGFuLXVpLXdvcmtzcGFjZS9zcmMvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBLDZCQUNFLFlBQWEsQ0FDYixNQUFPLENBQ1AsY0FBZSxDQUhqQiwwREFNSSxpQkFBa0IsQ0FOdEIseUZBV00sVUFBVyxDQVhqQiw0REFnQkksV0NmZ0IsQ0REcEIsa0VBb0JJLFdBQVksQ0FDWixZQUFhLENBQ2Isc0JBQXVCLENBQ3ZCLGtCQUFtQixDQXZCdkIseURBMkJJLFdBQVksQ0FDWixpQkFBa0IsQ0E1QnRCLDZEQWdDSSw0QkFBNEJcIixcImZpbGVcIjpcIlNpZGVyLm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ3N0eWxlcy92YXJpYWJsZXMnO1xcblxcbi5TaWRlciB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG5cXG4gICYuTW9iaWxlIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgfVxcblxcbiAgJi5jb2xsYXBzZWQge1xcbiAgICAuTG9nbyB7XFxuICAgICAgd2lkdGg6IDMycHg7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC5Ub3BBcmVhIHtcXG4gICAgaGVpZ2h0OiAkaGVhZGVyLWhlaWdodDtcXG4gIH1cXG5cXG4gIC5Mb2dvQ29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gIC5Mb2dvIHtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB9XFxuXFxuICAuTWVudUljb24ge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHghaW1wb3J0YW50O1xcbiAgfVxcbn1cXG5cIixcIiRzaWRlYmFyLXdpZHRoOiAyMzRweDtcXG4kc2lkZWJhci1jb2xsYXBzZWQtd2lkdGg6IDgwcHg7XFxuXFxuJGhlYWRlci1oZWlnaHQ6IDY0cHg7XCJdfV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiU2lkZXJcIjogXCJTaWRlci1tb2R1bGVfX1NpZGVyX19fMkhJRkhcIixcblx0XCJNb2JpbGVcIjogXCJTaWRlci1tb2R1bGVfX01vYmlsZV9fXzFDUzYxXCIsXG5cdFwiY29sbGFwc2VkXCI6IFwiU2lkZXItbW9kdWxlX19jb2xsYXBzZWRfX18zTjNkV1wiLFxuXHRcIkxvZ29cIjogXCJTaWRlci1tb2R1bGVfX0xvZ29fX19Pb1VxSlwiLFxuXHRcIlRvcEFyZWFcIjogXCJTaWRlci1tb2R1bGVfX1RvcEFyZWFfX18zNkZCZlwiLFxuXHRcIkxvZ29Db250YWluZXJcIjogXCJTaWRlci1tb2R1bGVfX0xvZ29Db250YWluZXJfX19NanNPaVwiLFxuXHRcIk1lbnVJY29uXCI6IFwiU2lkZXItbW9kdWxlX19NZW51SWNvbl9fXzNpTk40XCJcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQXBwTGF5b3V0LW1vZHVsZV9fTWFpbkxheW91dF9fXzJ5cGxye2hlaWdodDoxMDB2aDttYXJnaW4tbGVmdDoyMzRweDtvdmVyZmxvdzphdXRvfS5BcHBMYXlvdXQtbW9kdWxlX19NYWluTGF5b3V0X19fMnlwbHIuQXBwTGF5b3V0LW1vZHVsZV9fY29sbGFwc2VkX19fVGtlUDB7bWFyZ2luLWxlZnQ6ODBweH0uQXBwTGF5b3V0LW1vZHVsZV9fTWFpbkxheW91dF9fXzJ5cGxyLkFwcExheW91dC1tb2R1bGVfX21vYmlsZV9fX1U3MHNDe21hcmdpbi1sZWZ0OjB9LkFwcExheW91dC1tb2R1bGVfX0NvbnRlbnRfX18zcmp6a3ttYXJnaW4tdG9wOjY0cHh9LkFwcExheW91dC1tb2R1bGVfX0Zvb3Rlcl9fXzNlaVVte3RleHQtYWxpZ246Y2VudGVyfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9zZWFubWFjZmFybGFuZS9jb25uZWN0dXMtd2xhbi11aS13b3Jrc3BhY2Uvc3JjL2NvbnRhaW5lcnMvQXBwTGF5b3V0L0FwcExheW91dC5tb2R1bGUuc2Nzc1wiLFwiL1VzZXJzL3NlYW5tYWNmYXJsYW5lL2Nvbm5lY3R1cy13bGFuLXVpLXdvcmtzcGFjZS9zcmMvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBLHNDQUNFLFlBQWEsQ0FDYixpQkNKbUIsQ0RLbkIsYUFBYyxDQUhoQiwwRUFNSSxnQkNQMEIsQ0RDOUIsdUVBU0ksYUFBYyxDQUNmLG1DQUlELGVDYmtCLENEY25CLGtDQUdDLGlCQUFrQlwiLFwiZmlsZVwiOlwiQXBwTGF5b3V0Lm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ3N0eWxlcy92YXJpYWJsZXMnO1xcblxcbi5NYWluTGF5b3V0IHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtYXJnaW4tbGVmdDogJHNpZGViYXItd2lkdGg7XFxuICBvdmVyZmxvdzogYXV0bztcXG5cXG4gICYuY29sbGFwc2VkIHtcXG4gICAgbWFyZ2luLWxlZnQ6ICRzaWRlYmFyLWNvbGxhcHNlZC13aWR0aDtcXG4gIH1cXG4gICYubW9iaWxlIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICB9XFxufVxcblxcbi5Db250ZW50IHtcXG4gIG1hcmdpbi10b3A6ICRoZWFkZXItaGVpZ2h0O1xcbn1cXG5cXG4uRm9vdGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCIsXCIkc2lkZWJhci13aWR0aDogMjM0cHg7XFxuJHNpZGViYXItY29sbGFwc2VkLXdpZHRoOiA4MHB4O1xcblxcbiRoZWFkZXItaGVpZ2h0OiA2NHB4O1wiXX1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIk1haW5MYXlvdXRcIjogXCJBcHBMYXlvdXQtbW9kdWxlX19NYWluTGF5b3V0X19fMnlwbHJcIixcblx0XCJjb2xsYXBzZWRcIjogXCJBcHBMYXlvdXQtbW9kdWxlX19jb2xsYXBzZWRfX19Ua2VQMFwiLFxuXHRcIm1vYmlsZVwiOiBcIkFwcExheW91dC1tb2R1bGVfX21vYmlsZV9fX1U3MHNDXCIsXG5cdFwiQ29udGVudFwiOiBcIkFwcExheW91dC1tb2R1bGVfX0NvbnRlbnRfX18zcmp6a1wiLFxuXHRcIkZvb3RlclwiOiBcIkFwcExheW91dC1tb2R1bGVfX0Zvb3Rlcl9fXzNlaVVtXCJcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgTGF5b3V0LCBQb3BvdmVyLCBSb3cgfSBmcm9tICdhbnRkJztcbmltcG9ydCB7IE1lbnVVbmZvbGRPdXRsaW5lZCwgTWVudUZvbGRPdXRsaW5lZCwgU2V0dGluZ091dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vR2xvYmFsSGVhZGVyLm1vZHVsZS5zY3NzJztcblxuY29uc3QgeyBIZWFkZXIgfSA9IExheW91dDtcblxuY29uc3QgR2xvYmFsSGVhZGVyID0gKHsgY29sbGFwc2VkLCBvbk1lbnVCdXR0b25DbGljaywgaXNNb2JpbGUsIGxvZ29Nb2JpbGUgfSkgPT4ge1xuICBjb25zdCBbcG9wb3ZlclZpc2libGUsIHNldFBvcG92ZXJWaXNpYmxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoaWRlUG9wb3ZlciA9ICgpID0+IHtcbiAgICBzZXRQb3BvdmVyVmlzaWJsZShmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVmlzaWJsZUNoYW5nZSA9IHZpc2libGUgPT4ge1xuICAgIHNldFBvcG92ZXJWaXNpYmxlKHZpc2libGUpO1xuICB9O1xuXG4gIGNvbnN0IHVzZXJPcHRpb25zID0gKFxuICAgIDw+XG4gICAgICA8Um93PlxuICAgICAgICA8TGluayBvbkNsaWNrPXtoaWRlUG9wb3Zlcn0gdG89XCIvYWNjb3VudHMvY3VzdG9tZXJzL3ZpZXdcIj5cbiAgICAgICAgICBQcm9maWxlXG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvUm93PlxuICAgICAgPFJvdz5cbiAgICAgICAgPExpbmsgb25DbGljaz17aGlkZVBvcG92ZXJ9IHRvPVwiL2FjY291bnRcIj5cbiAgICAgICAgICBVc2Vyc1xuICAgICAgICA8L0xpbms+XG4gICAgICA8L1Jvdz5cbiAgICAgIDxSb3c+XG4gICAgICAgIDxMaW5rIG9uQ2xpY2s9e2hpZGVQb3BvdmVyfSB0bz1cIi9hY2NvdW50c1wiPlxuICAgICAgICAgIEFkdmFuY2VkXG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvUm93PlxuICAgICAgPFJvdz5cbiAgICAgICAgPExpbmsgb25DbGljaz17aGlkZVBvcG92ZXJ9IHRvPVwiL2FjY291bnRzL2N1c3RvbWVyc3h3XCI+XG4gICAgICAgICAgUnVsZXMgUHJlZmVyZW5jZVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L1Jvdz5cbiAgICA8Lz5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxIZWFkZXJcbiAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLkdsb2JhbEhlYWRlcn0gJHtjb2xsYXBzZWQgPyBzdHlsZXMuY29sbGFwc2VkIDogJyd9ICR7XG4gICAgICAgIGlzTW9iaWxlID8gc3R5bGVzLm1vYmlsZSA6ICcnXG4gICAgICB9YH1cbiAgICA+XG4gICAgICB7aXNNb2JpbGUgJiYgW1xuICAgICAgICA8TGluayBjbGFzc05hbWU9e3N0eWxlcy5Mb2dvQ29udGFpbmVyfSB0bz1cIi9cIiBrZXk9XCJtb2JpbGVMb2dvXCI+XG4gICAgICAgICAgPGltZyBzcmM9e2xvZ29Nb2JpbGV9IGFsdD1cImxvZ29cIiB3aWR0aD1cIjMyXCIgLz5cbiAgICAgICAgPC9MaW5rPixcbiAgICAgIF19XG4gICAgICB7Y29sbGFwc2VkID8gKFxuICAgICAgICA8TWVudVVuZm9sZE91dGxpbmVkIGNsYXNzTmFtZT17c3R5bGVzLk1lbnVJY29ufSBvbkNsaWNrPXtvbk1lbnVCdXR0b25DbGlja30gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxNZW51Rm9sZE91dGxpbmVkIGNsYXNzTmFtZT17c3R5bGVzLk1lbnVJY29ufSBvbkNsaWNrPXtvbk1lbnVCdXR0b25DbGlja30gLz5cbiAgICAgICl9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlJpZ2h0TWVudX0+XG4gICAgICAgIDxQb3BvdmVyXG4gICAgICAgICAgY29udGVudD17dXNlck9wdGlvbnN9XG4gICAgICAgICAgdHJpZ2dlcj1cImNsaWNrXCJcbiAgICAgICAgICBnZXRQb3B1cENvbnRhaW5lcj17ZSA9PiBlLnBhcmVudEVsZW1lbnR9XG4gICAgICAgICAgdmlzaWJsZT17cG9wb3ZlclZpc2libGV9XG4gICAgICAgICAgb25WaXNpYmxlQ2hhbmdlPXtoYW5kbGVWaXNpYmxlQ2hhbmdlfVxuICAgICAgICAgIHBsYWNlbWVudD1cImJvdHRvbVJpZ2h0XCJcbiAgICAgICAgICBhcnJvd1BvaW50QXRDZW50ZXJcbiAgICAgICAgPlxuICAgICAgICAgIDxTZXR0aW5nT3V0bGluZWQgY2xhc3NOYW1lPXtzdHlsZXMuTWVudUljb259IC8+XG4gICAgICAgIDwvUG9wb3Zlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvSGVhZGVyPlxuICApO1xufTtcblxuR2xvYmFsSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgY29sbGFwc2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBvbk1lbnVCdXR0b25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaXNNb2JpbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGxvZ29Nb2JpbGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsSGVhZGVyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgTGF5b3V0LCBNZW51LCBEcmF3ZXIgfSBmcm9tICdhbnRkJztcbmltcG9ydCB7XG4gIERhc2hib2FyZE91dGxpbmVkLFxuICBQcm9maWxlT3V0bGluZWQsXG4gIEFyZWFDaGFydE91dGxpbmVkLFxuICBNb2JpbGVPdXRsaW5lZCxcbiAgQXBpT3V0bGluZWQsXG4gIE5vdGlmaWNhdGlvbk91dGxpbmVkLFxuICBTZXR0aW5nT3V0bGluZWQsXG4gIExvZ291dE91dGxpbmVkLFxufSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9TaWRlci5tb2R1bGUuc2Nzcyc7XG5cbmNvbnN0IHsgU2lkZXIgfSA9IExheW91dDtcbmNvbnN0IHsgU3ViTWVudSwgSXRlbSB9ID0gTWVudTtcblxuY29uc3QgQUNDT1VOVFMgPSAnYWNjb3VudHMnO1xuY29uc3QgTkVUV09SSyA9ICduZXR3b3JrJztcbmNvbnN0IENPTkZJR1VSQVRJT04gPSAnY29uZmlndXJhdGlvbic7XG5jb25zdCBJTlNJR0hUUyA9ICdpbnNpZ2h0cyc7XG5jb25zdCBTWVNURU0gPSAnc3lzdGVtJztcbmNvbnN0IEhJU1RPUlkgPSAnaGlzdG9yeSc7XG5jb25zdCByb290U3VibWVudUtleXMgPSBbQUNDT1VOVFMsIE5FVFdPUkssIENPTkZJR1VSQVRJT04sIElOU0lHSFRTLCBTWVNURU0sIEhJU1RPUlldO1xuXG5jb25zdCBTaWRlTWVudSA9ICh7XG4gIGxvY2F0aW9uU3RhdGUsXG4gIGNvbGxhcHNlZCxcbiAgaXNNb2JpbGUsXG4gIGxvZ28sXG4gIGxvZ29Nb2JpbGUsXG4gIG9uTWVudUJ1dHRvbkNsaWNrLFxuICBvbk1lbnVJdGVtQ2xpY2ssXG4gIG9uTG9nb3V0LFxufSkgPT4ge1xuICBjb25zdCBbb3BlbktleXMsIHNldE9wZW5LZXlzXSA9IHVzZVN0YXRlKFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldE9wZW5LZXlzKFtdKTtcbiAgfSwgW2NvbGxhcHNlZF0pO1xuXG4gIGNvbnN0IGRlZmF1bHRNZW51SXRlbXMgPSBbXG4gICAge1xuICAgICAga2V5OiAnZGFzaGJvYXJkJyxcbiAgICAgIGljb246IDxEYXNoYm9hcmRPdXRsaW5lZCBjbGFzc05hbWU9e3N0eWxlcy5NZW51SWNvbn0gLz4sXG4gICAgICBwYXRoOiAnLycsXG4gICAgICB0ZXh0OiAnRGFzaGJvYXJkJyxcbiAgICAgIG9uQ2xpY2s6IG9uTWVudUl0ZW1DbGljayxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3Byb2ZpbGVzJyxcbiAgICAgIGljb246IDxQcm9maWxlT3V0bGluZWQgY2xhc3NOYW1lPXtzdHlsZXMuTWVudUljb259IC8+LFxuICAgICAgcGF0aDogJy9wcm9maWxlcycsXG4gICAgICB0ZXh0OiAnUHJvZmlsZXMnLFxuICAgICAgb25DbGljazogb25NZW51SXRlbUNsaWNrLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAncmVwb3J0cycsXG4gICAgICBpY29uOiA8QXJlYUNoYXJ0T3V0bGluZWQgY2xhc3NOYW1lPXtzdHlsZXMuTWVudUljb259IC8+LFxuICAgICAgcGF0aDogJy9hbmFseXRpY3MvcW9lJyxcbiAgICAgIHRleHQ6ICdJbnNpZ2h0cycsXG4gICAgICBvbkNsaWNrOiBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdjbGllbnQtZGV2aWNlcycsXG4gICAgICBpY29uOiA8TW9iaWxlT3V0bGluZWQgY2xhc3NOYW1lPXtzdHlsZXMuTWVudUljb259IC8+LFxuICAgICAgcGF0aDogJy9uZXR3b3JrL2NsaWVudC1kZXZpY2VzJyxcbiAgICAgIHRleHQ6ICdDbGllbnQgRGV2aWNlcycsXG4gICAgICBvbkNsaWNrOiBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICduZXR3b3JrLWVsZW1lbnRzJyxcbiAgICAgIGljb246IDxBcGlPdXRsaW5lZCBjbGFzc05hbWU9e3N0eWxlcy5NZW51SWNvbn0gLz4sXG4gICAgICBwYXRoOiAnL25ldHdvcmsvZWxlbWVudHMnLFxuICAgICAgdGV4dDogJ05ldHdvcmsgRWxlbWVudHMnLFxuICAgICAgb25DbGljazogb25NZW51SXRlbUNsaWNrLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnYWxhcm1zJyxcbiAgICAgIGljb246IDxOb3RpZmljYXRpb25PdXRsaW5lZCBjbGFzc05hbWU9e3N0eWxlcy5NZW51SWNvbn0gLz4sXG4gICAgICBwYXRoOiAnL25ldHdvcmsvYWxhcm1zJyxcbiAgICAgIHRleHQ6ICdBbGFybXMnLFxuICAgICAgb25DbGljazogb25NZW51SXRlbUNsaWNrLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnc2V0dGluZ3MnLFxuICAgICAgaWNvbjogPFNldHRpbmdPdXRsaW5lZCBjbGFzc05hbWU9e3N0eWxlcy5NZW51SWNvbn0gLz4sXG4gICAgICBwYXRoOiAnL3NldHRpbmdzJyxcbiAgICAgIHRleHQ6ICdTZXR0aW5ncycsXG4gICAgICBvbkNsaWNrOiBvbk1lbnVJdGVtQ2xpY2ssXG4gICAgfSxcbiAgICB7XG4gICAgICBrZXk6ICdsb2dvdXQnLFxuICAgICAgaWNvbjogPExvZ291dE91dGxpbmVkIGNsYXNzTmFtZT17c3R5bGVzLk1lbnVJY29ufSAvPixcbiAgICAgIHBhdGg6ICcvc2lnbm91dCcsXG4gICAgICB0ZXh0OiAnU2lnbiBPdXQnLFxuICAgICAgb25DbGljazogb25Mb2dvdXQsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBvbk9wZW5DaGFuZ2UgPSBrZXlzID0+IHtcbiAgICBjb25zdCBsYXRlc3RPcGVuS2V5ID0ga2V5cy5maW5kKGtleSA9PiAhb3BlbktleXMuaW5jbHVkZXMoa2V5KSk7XG5cbiAgICBpZiAocm9vdFN1Ym1lbnVLZXlzLmluZGV4T2YobGF0ZXN0T3BlbktleSkgPT09IC0xKSB7XG4gICAgICBzZXRPcGVuS2V5cyhrZXlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0T3BlbktleXMobGF0ZXN0T3BlbktleSA/IFtsYXRlc3RPcGVuS2V5XSA6IFtdKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0TWVudSA9IChjb25maWcgPSB7IGl0ZW1zOiBbXSB9LCBkZWZhdWx0U2VsZWN0ZWRLZXlzID0gW10pID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuXG4gICAgbGV0IGtleXMgPSBbXTtcbiAgICBsZXQgc2VsZWN0ZWRLZXlzID0gWy4uLmRlZmF1bHRTZWxlY3RlZEtleXNdO1xuXG4gICAgY29uZmlnLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmtleSkge1xuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgIGNvbnN0IHN1Yk1lbnUgPSBnZXRNZW51KHsgaXRlbXM6IGl0ZW0uY2hpbGRyZW4sIHBhcmVudDogaXRlbSB9KTtcblxuICAgICAgICAgIGlmIChzdWJNZW51LnNlbGVjdGVkS2V5cyAmJiBzdWJNZW51LnNlbGVjdGVkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkS2V5cyA9IFsuLi5zZWxlY3RlZEtleXMsIC4uLnN1Yk1lbnUuc2VsZWN0ZWRLZXlzXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1Yk1lbnUub3BlbktleXMgJiYgc3ViTWVudS5vcGVuS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGtleXMgPSBbLi4ua2V5cywgLi4uc3ViTWVudS5vcGVuS2V5c107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXRlbXMucHVzaChcbiAgICAgICAgICAgIDxTdWJNZW51XG4gICAgICAgICAgICAgIGtleT17aXRlbS5rZXl9XG4gICAgICAgICAgICAgIHRpdGxlPXtcbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmljb259XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS50ZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3N1Yk1lbnUuaXRlbXN9XG4gICAgICAgICAgICA8L1N1Yk1lbnU+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBJdGVtQ29tcG9uZW50ID0gaXRlbS5Db21wb25lbnQgfHwgSXRlbTtcblxuICAgICAgICAgIGxldCBMaW5rQ29tcG9uZW50ID0gKHsgLi4ucmVzdFAgfSkgPT4gKFxuICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgLy8gcHJlc2VydmVQYXJhbXM9e3RoaXMuZ2V0UHJlc2VydmVkUGFyYW1zKGl0ZW0ucGF0aCwgbG9jYXRpb25TdGF0ZSl9XG4gICAgICAgICAgICAgIHsuLi5yZXN0UH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpdGVtLkxpbmtDb21wb25lbnQpIHtcbiAgICAgICAgICAgIExpbmtDb21wb25lbnQgPSBpdGVtLkxpbmtDb21wb25lbnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcGF0aCA9IGxvY2F0aW9uU3RhdGUucGF0aG5hbWU7XG4gICAgICAgICAgY29uc3QgcGF0aEFuZEhhc2ggPSBgJHtwYXRofSR7bG9jYXRpb25TdGF0ZS5oYXNofWA7IC8vIGZvciBoYXNoIHJvdXRpbmdcblxuICAgICAgICAgIGlmIChwYXRoLnN0YXJ0c1dpdGgoaXRlbS5wYXRoKSB8fCBwYXRoQW5kSGFzaC5zdGFydHNXaXRoKGl0ZW0ucGF0aCkpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcucGFyZW50KSB7XG4gICAgICAgICAgICAgIGtleXMucHVzaChjb25maWcucGFyZW50LmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZEtleXMucHVzaChpdGVtLmtleS50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpdGVtcy5wdXNoKFxuICAgICAgICAgICAgPEl0ZW1Db21wb25lbnQga2V5PXtpdGVtLmtleX0gY2xhc3NOYW1lPVwiYW50LW1lbnUtaXRlbVwiPlxuICAgICAgICAgICAgICA8TGlua0NvbXBvbmVudCBvbkNsaWNrPXtpdGVtLm9uQ2xpY2t9IHRvPXtpdGVtLnBhdGh9PlxuICAgICAgICAgICAgICAgIHtpdGVtLmljb259XG4gICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0udGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvTGlua0NvbXBvbmVudD5cbiAgICAgICAgICAgIDwvSXRlbUNvbXBvbmVudD5cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXMsXG4gICAgICBzZWxlY3RlZEtleXMsXG4gICAgICBrZXlzLFxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgbWVudUNvbmZpZyA9IHtcbiAgICBpdGVtczogZGVmYXVsdE1lbnVJdGVtcyxcbiAgfTtcblxuICBjb25zdCBtZW51ID0gZ2V0TWVudShtZW51Q29uZmlnKTtcblxuICBjb25zdCBzaWRlciA9IChcbiAgICA8U2lkZXJcbiAgICAgIGNvbGxhcHNlZD17aXNNb2JpbGUgPyBmYWxzZSA6IGNvbGxhcHNlZH1cbiAgICAgIHdpZHRoPVwiMjM0cHhcIlxuICAgICAgY29sbGFwc2VkV2lkdGg9XCI4MHB4XCJcbiAgICAgIGJyZWFrcG9pbnQ9XCJsZ1wiXG4gICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5TaWRlcn0gJHtjb2xsYXBzZWQgPyBzdHlsZXMuY29sbGFwc2VkIDogJyd9ICAke1xuICAgICAgICBpc01vYmlsZSA/IHN0eWxlcy5Nb2JpbGUgOiAnJ1xuICAgICAgfWB9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5Ub3BBcmVhfT5cbiAgICAgICAgPExpbmsgY2xhc3NOYW1lPXtzdHlsZXMuTG9nb0NvbnRhaW5lcn0gdG89XCIvXCI+XG4gICAgICAgICAgPGltZyBjbGFzc05hbWU9e3N0eWxlcy5Mb2dvfSBhbHQ9XCJsb2dvXCIgc3JjPXtjb2xsYXBzZWQgPyBsb2dvTW9iaWxlIDogbG9nb30gLz5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgICA8TWVudVxuICAgICAgICBjbGFzc05hbWU9XCJzaWRlbWVudVwiXG4gICAgICAgIHNlbGVjdGVkS2V5cz17bWVudS5zZWxlY3RlZEtleXN9XG4gICAgICAgIGRlZmF1bHRPcGVuS2V5cz17bWVudS5vcGVuS2V5c31cbiAgICAgICAgb25PcGVuQ2hhbmdlPXtvbk9wZW5DaGFuZ2V9XG4gICAgICAgIG1vZGU9XCJpbmxpbmVcIlxuICAgICAgICB0aGVtZT1cImRhcmtcIlxuICAgICAgPlxuICAgICAgICB7bWVudS5pdGVtc31cbiAgICAgIDwvTWVudT5cbiAgICA8L1NpZGVyPlxuICApO1xuXG4gIGlmIChpc01vYmlsZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8RHJhd2VyXG4gICAgICAgIHpJbmRleD17OTk5OX1cbiAgICAgICAgcGxhY2VtZW50PVwibGVmdFwiXG4gICAgICAgIGNsb3NhYmxlPXtmYWxzZX1cbiAgICAgICAgdmlzaWJsZT17IWNvbGxhcHNlZH1cbiAgICAgICAgb25DbG9zZT17b25NZW51QnV0dG9uQ2xpY2t9XG4gICAgICAgIGJvZHlTdHlsZT17eyBwYWRkaW5nOiAwIH19XG4gICAgICAgIHdpZHRoPXsyNTZ9XG4gICAgICA+XG4gICAgICAgIHtzaWRlcn1cbiAgICAgIDwvRHJhd2VyPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gc2lkZXI7XG59O1xuXG5TaWRlTWVudS5wcm9wVHlwZXMgPSB7XG4gIGxvY2F0aW9uU3RhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKE9iamVjdCkuaXNSZXF1aXJlZCxcbiAgY29sbGFwc2VkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICBpc01vYmlsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgbG9nbzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBsb2dvTW9iaWxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uTWVudUJ1dHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1lbnVJdGVtQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTG9nb3V0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2lkZU1lbnU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tICdhbnRkJztcblxuaW1wb3J0IEdsb2JhbEhlYWRlciBmcm9tICdjb21wb25lbnRzL0dsb2JhbEhlYWRlcic7XG5pbXBvcnQgU2lkZU1lbnUgZnJvbSAnY29tcG9uZW50cy9TaWRlTWVudSc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9BcHBMYXlvdXQubW9kdWxlLnNjc3MnO1xuXG5jb25zdCB7IENvbnRlbnQsIEZvb3RlciB9ID0gTGF5b3V0O1xuXG5jb25zdCBBcHBMYXlvdXQgPSAoeyBjaGlsZHJlbiwgY29tcGFueSwgbG9nbywgbG9nb01vYmlsZSwgbG9jYXRpb25TdGF0ZSwgb25Mb2dvdXQgfSkgPT4ge1xuICBjb25zdCBbaXNDb2xsYXBzZWQsIHNldElzQ29sbGFwc2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzTW9iaWxlLCBzZXRJc01vYmlsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzY3JlZW5TaXplLCBzZXRTY3JlZW5TaXplXSA9IHVzZVN0YXRlKCdsZycpO1xuXG4gIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICBjb25zdCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgaWYgKHdpZHRoIDwgNzY4ICYmIHNjcmVlblNpemUgIT09ICdzbScpIHtcbiAgICAgIHNldElzQ29sbGFwc2VkKHRydWUpO1xuICAgICAgc2V0SXNNb2JpbGUodHJ1ZSk7XG4gICAgICBzZXRTY3JlZW5TaXplKCdzbScpO1xuICAgIH0gZWxzZSBpZiAod2lkdGggPj0gNzY4ICYmIHdpZHRoIDwgOTkyICYmIHNjcmVlblNpemUgIT09ICdtZCcpIHtcbiAgICAgIHNldElzQ29sbGFwc2VkKHRydWUpO1xuICAgICAgc2V0SXNNb2JpbGUoZmFsc2UpO1xuICAgICAgc2V0U2NyZWVuU2l6ZSgnbWQnKTtcbiAgICB9IGVsc2UgaWYgKHdpZHRoID49IDk5MiAmJiBzY3JlZW5TaXplICE9PSAnbGcnKSB7XG4gICAgICBzZXRJc0NvbGxhcHNlZChmYWxzZSk7XG4gICAgICBzZXRJc01vYmlsZShmYWxzZSk7XG4gICAgICBzZXRTY3JlZW5TaXplKCdsZycpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVNZW51VG9nZ2xlID0gKCkgPT4ge1xuICAgIHNldElzQ29sbGFwc2VkKCFpc0NvbGxhcHNlZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTWVudUl0ZW1DbGljayA9ICgpID0+IHtcbiAgICBpZiAoaXNNb2JpbGUgPT09IHRydWUpIHtcbiAgICAgIHNldElzQ29sbGFwc2VkKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVMb2dvdXQgPSAoKSA9PiB7XG4gICAgb25Mb2dvdXQoKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGhhbmRsZVJlc2l6ZSgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG4gIH0sIFtzY3JlZW5TaXplXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGF5b3V0PlxuICAgICAgPFNpZGVNZW51XG4gICAgICAgIGxvY2F0aW9uU3RhdGU9e2xvY2F0aW9uU3RhdGV9XG4gICAgICAgIGNvbGxhcHNlZD17aXNDb2xsYXBzZWR9XG4gICAgICAgIGlzTW9iaWxlPXtpc01vYmlsZX1cbiAgICAgICAgbG9nbz17bG9nb31cbiAgICAgICAgbG9nb01vYmlsZT17bG9nb01vYmlsZX1cbiAgICAgICAgb25NZW51QnV0dG9uQ2xpY2s9e2hhbmRsZU1lbnVUb2dnbGV9XG4gICAgICAgIG9uTWVudUl0ZW1DbGljaz17aGFuZGxlTWVudUl0ZW1DbGlja31cbiAgICAgICAgb25Mb2dvdXQ9e2hhbmRsZUxvZ291dH1cbiAgICAgIC8+XG4gICAgICA8TGF5b3V0XG4gICAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLk1haW5MYXlvdXR9ICR7aXNDb2xsYXBzZWQgPyBzdHlsZXMuY29sbGFwc2VkIDogJyd9ICR7XG4gICAgICAgICAgaXNNb2JpbGUgPyBzdHlsZXMubW9iaWxlIDogJydcbiAgICAgICAgfWB9XG4gICAgICA+XG4gICAgICAgIDxHbG9iYWxIZWFkZXJcbiAgICAgICAgICBjb2xsYXBzZWQ9e2lzQ29sbGFwc2VkfVxuICAgICAgICAgIGlzTW9iaWxlPXtpc01vYmlsZX1cbiAgICAgICAgICBsb2dvTW9iaWxlPXtsb2dvTW9iaWxlfVxuICAgICAgICAgIG9uTWVudUJ1dHRvbkNsaWNrPXtoYW5kbGVNZW51VG9nZ2xlfVxuICAgICAgICAvPlxuICAgICAgICA8Q29udGVudCBjbGFzc05hbWU9e3N0eWxlcy5Db250ZW50fT57Y2hpbGRyZW59PC9Db250ZW50PlxuICAgICAgICA8Rm9vdGVyIGNsYXNzTmFtZT17c3R5bGVzLkZvb3Rlcn0+XG4gICAgICAgICAgQ29weXJpZ2h0IMKpIHtjdXJyZW50WWVhcn0ge2NvbXBhbnl9IEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgICAgPC9Gb290ZXI+XG4gICAgICA8L0xheW91dD5cbiAgICA8L0xheW91dD5cbiAgKTtcbn07XG5cbkFwcExheW91dC5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBjb21wYW55OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGxvZ286IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbG9nb01vYmlsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBvbkxvZ291dDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbG9jYXRpb25TdGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YoT2JqZWN0KS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwTGF5b3V0O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4gPGgxPkRhc2hib2FyZDwvaDE+O1xuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENhcmQsIEZvcm0sIElucHV0LCBCdXR0b24gfSBmcm9tICdhbnRkJztcblxuY29uc3QgeyBJdGVtIH0gPSBGb3JtO1xuXG5jb25zdCBMb2dpbiA9ICgpID0+IChcbiAgPENhcmQ+XG4gICAgPGgxPlRlc3QgSW48L2gxPlxuICAgIDxGb3JtIG5hbWU9XCJsb2dpblwiPlxuICAgICAgPEl0ZW1cbiAgICAgICAgbGFiZWw9XCJFLW1haWxcIlxuICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICBydWxlcz17W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZTogJ1BsZWFzZSBpbnB1dCB5b3VyIGUtbWFpbCEnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIDxJbnB1dCAvPlxuICAgICAgPC9JdGVtPlxuXG4gICAgICA8SXRlbVxuICAgICAgICBsYWJlbD1cIlBhc3N3b3JkXCJcbiAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgcnVsZXM9e1tcbiAgICAgICAgICB7XG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgaW5wdXQgeW91ciBwYXNzd29yZCEnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIDxJbnB1dC5QYXNzd29yZCAvPlxuICAgICAgPC9JdGVtPlxuICAgICAgPEl0ZW0+XG4gICAgICAgIDxCdXR0b24gdHlwZT1cInByaW1hcnlcIiBodG1sVHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgIExvZyBJblxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvSXRlbT5cbiAgICA8L0Zvcm0+XG4gIDwvQ2FyZD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUm91dGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuaW1wb3J0IEFwcExheW91dCBmcm9tICdjb250YWluZXJzL0FwcExheW91dCc7XG5cbmNvbnN0IFJvdXRlV2l0aExheW91dCA9ICh7IGNvbXBvbmVudDogQ29tcG9uZW50LCAuLi5yZXN0IH0pID0+IChcbiAgPFJvdXRlXG4gICAgey4uLnJlc3R9XG4gICAgcmVuZGVyPXtwcm9wcyA9PiAoXG4gICAgICA8QXBwTGF5b3V0PlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz5cbiAgICAgIDwvQXBwTGF5b3V0PlxuICAgICl9XG4gIC8+XG4pO1xuXG5Sb3V0ZVdpdGhMYXlvdXQucHJvcFR5cGVzID0ge1xuICBjb21wb25lbnQ6IFQuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUm91dGVXaXRoTGF5b3V0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
