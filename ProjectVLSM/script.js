
    function calcularVLSM() {
      const baseInput = document.getElementById("baseIP").value;
      const hostInput = document.getElementById("hosts").value;
      const resultadoDiv = document.getElementById("resultado");

      try {
        const [baseIP, cidr] = baseInput.trim().split("/");
        const hosts = hostInput
          .split(",")
          .map(h => parseInt(h.trim()))
          .filter(h => !isNaN(h));

        hosts.sort((a, b) => b - a);

        let currentIP = ipToInt(baseIP);
        let html = "";

        for (let i = 0; i < hosts.length; i++) {
          let neededBits = 0;
          while ((1 << neededBits) <= (hosts[i] + 2)) neededBits++;

          let subnetCIDR = 32 - neededBits;
          let blockSize = 1 << neededBits;

          let network = intToIP(currentIP);
          let firstIP = intToIP(currentIP + 1);
          let lastIP = intToIP(currentIP + blockSize - 2);
          let broadcast = intToIP(currentIP + blockSize - 1);

          html += `
            <div class="subnet-block">
              <p><strong>Sub-rede ${i + 1}:</strong> ${network}/${subnetCIDR}</p>
              <p>Hosts: ${hosts[i]}</p>
              <p>Primeiro IP: ${firstIP}</p>
              <p>Último IP: ${lastIP}</p>
              <p>Broadcast: ${broadcast}</p>
              <p>Máscara: ${cidrToMask(subnetCIDR)}</p>
            </div>
          `;

          currentIP += blockSize;
        }

        resultadoDiv.innerHTML = html;
      } catch (e) {
        resultadoDiv.innerHTML = `<p style='color:red;'>Erro no cálculo: ${e.message}</p>`;
      }
    }

    function ipToInt(ip) {
      return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0);
    }

    function intToIP(num) {
      return `${(num >>> 24)}.${(num >>> 16 & 255)}.${(num >>> 8 & 255)}.${(num & 255)}`;
    }

    function cidrToMask(cidr) {
      const mask = 0xffffffff << (32 - cidr);
      return `${(mask >>> 24) & 255}.${(mask >>> 16) & 255}.${(mask >>> 8) & 255}.${mask & 255}`;
    }

    async function exportarPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const resultadoDiv = document.getElementById("resultado");

      let y = 10;
      const blocks = resultadoDiv.querySelectorAll(".subnet-block");

      if (blocks.length === 0) {
        alert("Nenhum resultado para exportar!");
        return;
      }

      blocks.forEach((block, index) => {
        const lines = block.innerText.split("\n");
        lines.forEach(line => {
          if (y > 270) {
            doc.addPage();
            y = 10;
          }
          doc.text(line, 10, y);
          y += 8;
        });
        y += 6;
      });

      doc.save("vlsm_resultado.pdf");
    }
