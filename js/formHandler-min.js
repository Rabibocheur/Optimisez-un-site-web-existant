$(function () {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: !0,
    submitSuccess: function (t, e) {
      var s;
      t.attr("action") ||
        (e.preventDefault(),
        (e = (function (t) {
          var e = "./includes/" + t.attr("id") + ".php";
          t.attr("template-path") &&
            (e =
              t.attr("template-path") + "/includes/" + t.attr("id") + ".php");
          return e;
        })(t)),
        (s = {}),
        t.find("input, textarea, option:selected").each(function (t) {
          var e = $(this).val(),
            i = $(this).attr("id");
          $(this).is(":checkbox")
            ? (e = $(this).is(":checked"))
            : $(this).is(":radio")
            ? (e = $(this).val() + " = " + $(this).is(":checked"))
            : $(this).is("option:selected") &&
              (i = $(this).parent().attr("id")),
            (s[i] = e);
        }),
        $.ajax({
          url: e,
          type: "POST",
          data: s,
          cache: !1,
          success: function () {
            t.is("[success-msg]")
              ? t.append(
                  "<div id='form-alert'><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                    t.attr("success-msg") +
                    "</strong></div></div>"
                )
              : window.location.replace(t.attr("success-url")),
              t.trigger("reset");
          },
          error: function () {
            0 == $("#form-alert").length &&
              t.append(
                "<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>" +
                  t.attr("fail-msg") +
                  "</strong></div></div>"
              );
          },
        }));
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });
});
