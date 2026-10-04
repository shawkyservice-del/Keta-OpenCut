from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
UXP = ROOT / "extension" / "com.opencut.uxp"

def test_keta_test_server_is_visible_and_bound():
    html = (UXP / "index.html").read_text(encoding="utf-8")
    js = (UXP / "keta-shell.js").read_text(encoding="utf-8")
    css = (UXP / "style.css").read_text(encoding="utf-8")

    assert html.count('id="ketaTestServerBtn"') == 1
    assert 'src="keta-shell.js"' in html
    assert 'refresh.click()' in js
    assert 'button.removeAttribute("disabled")' in js
    assert 'SERVER ONLINE' in js
    assert '.keta-test-server-top' in css

def test_keta_no_duplicate_ids():
    html = (UXP / "index.html").read_text(encoding="utf-8")
    ids = re.findall(r'\bid="([^"]+)"', html)
    dupes = sorted({item for item in ids if ids.count(item) > 1})
    assert dupes == []
